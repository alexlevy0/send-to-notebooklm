"use client";

import { OnboardingTooltip } from "@/components/onboarding-tooltip";

import {
  Book,
  Check,
  CreditCard,
  ExternalLink,
  RefreshCw,
  Settings,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { NotebookLM } from "@/lib/notebooklm/api";
import type { Notebook } from "@/lib/notebooklm/types";
import { checkLimit } from "@/lib/supabase"; // Import checkLimit for status
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function PopupMain() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(
    null,
  );
  const [addingToNotebookId, setAddingToNotebookId] = useState<string | null>(
    null,
  );
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [usageInfo, setUsageInfo] = useState<{
    daily: number;
    monthly: number;
  } | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setCurrentUrl(tabs[0].url);
        }
      });
    } else {
      // Dev mode fallback
      setCurrentUrl("https://example.com");
    }
  }, []);



  const fetchNotebooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const start = performance.now();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out (10s)")), 10000),
      );

      const nbs = (await Promise.race([
        NotebookLM.listNotebooks(),
        timeoutPromise,
      ])) as Notebook[];

      console.log(
        `Fetched ${nbs.length} notebooks in ${performance.now() - start}ms`,
      );
      setNotebooks(nbs);
    } catch (err: any) {
      console.error("Failed to fetch notebooks:", err);
      setError(err.message || "Failed to load notebooks");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStatus = async () => {
    setCheckingStatus(true);
    try {
      const status = await checkLimit();
      setIsPro(status.isPro);
      if (status.userId) {
        setUserId(status.userId);
      }
      // NOUVEAU : Stocker les remaining captures
      if (status.remaining) {
        setUsageInfo({
          daily: status.remaining.daily,
          monthly: status.remaining.monthly,
        });
      }
    } catch (e) {
      console.error("Failed to check status:", e);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    fetchNotebooks();
    fetchUserStatus();
  }, []);

  // Restore last selected notebook from storage
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // ESC ferme le popup
      if (e.key === 'Escape') {
        window.close();
      }
      
      // Enter pour sélectionner
      if (e.key === 'Enter' && selectedNotebookId) {
        const found = notebooks.find(nb => nb.id === selectedNotebookId);
        if (found) handleNotebookSelect(found);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedNotebookId, notebooks]);

  useEffect(() => {
    notebooks.length === 0 ||
    typeof chrome === "undefined" ||
    !chrome.storage
      ? null
      : chrome.storage.local.get("lastNotebook", (result) => {
          if (result.lastNotebook && result.lastNotebook.id) {
            const found = notebooks.find((nb) => nb.id === result.lastNotebook.id);
            if (found) {
              setSelectedNotebookId(found.id);
              console.log("Restored last notebook:", found.title);
            }
          }
        });
  }, [notebooks]);

  const handleNotebookSelect = async (notebook: Notebook) => {
    if (addingToNotebookId) return;

    // Save to storage
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({
        lastNotebook: {
          id: notebook.id,
          title: notebook.title,
        },
      });
    }

    setSelectedNotebookId(notebook.id);

    if (!currentUrl) {
      setError("No URL found to add.");
      return;
    }

    setAddingToNotebookId(notebook.id);
    try {
      console.log(`Adding ${currentUrl} to notebook ${notebook.id}...`);
      await NotebookLM.addUrlSource(notebook.id, currentUrl);

      // Success Notification
      if (typeof chrome !== "undefined" && chrome.notifications) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon-48.png",
          title: "Captured!",
          message: `Page added to "${notebook.title}"`,
        });
      }

      console.log("Success!");

      // Close popup after delay
      setTimeout(() => {
        window.close();
      }, 1500);
    } catch (err: any) {
      console.error("Failed to add source:", err);

      if (err.name === "LimitReachedError") {
        // NOUVEAU : Afficher le modal au lieu de juste logger
        setShowUpgradeModal(true);
        setError(
          err.reason === "daily_limit"
            ? "Daily limit reached (10 captures). Upgrade to Pro for unlimited captures."
            : "Monthly limit reached (200 captures). Upgrade to Pro for unlimited captures."
        );
      } else {
        // Show other errors in the UI too, instead of alert
        setError(err.message || "Failed to add source");
      }
    } finally {
      setAddingToNotebookId(null);
    }
  };

  const handleOpenNotebookLM = () => {
    window.open("https://notebooklm.google.com", "_blank");
  };

  return (
    <div className="w-[650px] h-[500px] bg-background text-foreground flex flex-col font-sans">
      <header className="p-4 border-b flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-indigo-600" />
          <h1 className="font-semibold text-lg tracking-tight text-foreground">Send to NotebookLM</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {!checkingStatus && (
            <Badge 
              variant={isPro ? "default" : "outline"} 
              className={isPro ? "bg-indigo-600 hover:bg-indigo-700" : "text-muted-foreground border-dashed cursor-pointer hover:bg-muted"}
              onClick={() => !isPro && window.open("https://send-to-notebooklm.com", "_blank")}
            >
              {isPro ? (
                 <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-yellow-300" /> PRO</span>
              ) : (
                 "Free"
              )}
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={fetchNotebooks}
            disabled={loading}
            title="Refresh Notebooks"
            className="h-8 w-8"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-indigo-600" : "text-muted-foreground"}`} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings">
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isPro ? (
                 <DropdownMenuItem onClick={() => window.open("https://billing.stripe.com/p/login/YOUR_REAL_PORTAL_ID", "_blank")}>
                    <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
                 </DropdownMenuItem>
              ) : (
                <DropdownMenuItem 
                  className="text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50" 
                  onClick={() => {
                    const baseUrl = "https://buy.stripe.com/test_28E28s8BcgZd2Td4Z6cfK00";
                    const url = userId ? `${baseUrl}?client_reference_id=${userId}` : "https://send-to-notebooklm.com";
                    // If we have a direct Stripe link, use it. If not, go to landing page (but landing page is hard to pass ID unless we modify it)
                    // Let's use the direct Stripe link if we have the ID.
                    window.open(url, "_blank");
                  }}
                >
                   <Sparkles className="mr-2 h-4 w-4" /> Upgrade to Pro
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOpenNotebookLM}>
                <ExternalLink className="mr-2 h-4 w-4" /> Open NotebookLM
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-muted-foreground text-xs justify-center cursor-default hover:bg-transparent">
                  Version 0.1.0
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </header>

      {!isPro && usageInfo && (
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <span className="font-semibold text-blue-900">
                  {usageInfo.daily} / 10
                </span>
                <span className="text-blue-700 ml-1">captures left today</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              Free Tier
            </Badge>
          </div>
          <div className="mt-1 text-xs text-blue-600">
            Monthly: {usageInfo.monthly} / 200 remaining
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
        {error ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center gap-4">
            <div className="text-destructive font-medium">
              {error.includes("limit") ? "Limit Reached" : "Error"}
            </div>
            <p className="text-sm text-muted-foreground">{error}</p>
            {error.includes("cookie") ? (
              <Button onClick={handleOpenNotebookLM}>
                Login to NotebookLM <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={fetchNotebooks}>Try Again</Button>
            )}
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-3 animate-pulse border-neutral-100 shadow-none">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded bg-neutral-100" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-neutral-100" />
                    <Skeleton className="h-3 w-1/2 bg-neutral-50" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : notebooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center gap-2">
            <Book className="h-10 w-10 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No notebooks found.</p>
            <Button variant="outline" size="sm" onClick={handleOpenNotebookLM}>
              Create one <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col flex-1 min-h-0 gap-2">
              <div className="flex items-center justify-between shrink-0">
                <span className="text-sm font-medium text-muted-foreground">
                  Select a notebook
                </span>
                <Badge variant="secondary">{notebooks.length} found</Badge>
              </div>

              <ScrollArea className="h-full w-full rounded-md border">
                <div className="space-y-2 p-3 pr-4">
                  {notebooks.map((nb) => (
                    <Card
                      key={nb.id}
                      className={`cursor-pointer group transition-all duration-200 hover:shadow-md hover:border-indigo-200 mx-1 border-transparent hover:bg-white
                        ${selectedNotebookId === nb.id ? "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30" : "bg-card"} 
                        ${addingToNotebookId === nb.id ? "opacity-70 pointer-events-none" : ""}`}
                      onClick={() => handleNotebookSelect(nb)}
                    >
                      <div className="p-3 flex items-start gap-3">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          {addingToNotebookId === nb.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Book className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {nb.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate font-mono opacity-70">
                            {nb.id.substring(0, 8)}...
                          </div>
                        </div>
                        {selectedNotebookId === nb.id &&
                          addingToNotebookId !== nb.id && (
                            <div className="text-primary shrink-0">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </main>


      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Crown className="h-6 w-6 text-yellow-500" />
              Upgrade to Pro
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You've reached your daily limit of 10 captures.
            </p>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
              <h3 className="font-bold text-lg mb-3 text-indigo-900">
                Pro Benefits
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-indigo-600" />
                  <span>Unlimited captures (no daily/monthly limits)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-indigo-600" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-indigo-600" />
                  <span>Early access to new features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-indigo-600" />
                  <span>Pro badge in extension</span>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-indigo-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-indigo-900">€3</span>
                  <span className="text-indigo-700">/month</span>
                </div>
                <p className="text-xs text-indigo-600 mt-1">
                  or €30/year (save 17%)
                </p>
              </div>
            </div>

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-semibold"
              onClick={() => {
                const baseUrl = "https://buy.stripe.com/test_28E28s8BcgZd2Td4Z6cfK00";
                const stripeLink = userId ? `${baseUrl}?client_reference_id=${userId}` : baseUrl;
                window.open(stripeLink, '_blank');
              }}
            >
              <Crown className="mr-2 h-5 w-5" />
              Upgrade Now
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setShowUpgradeModal(false)}
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <OnboardingTooltip />
    </div>
  );
}
