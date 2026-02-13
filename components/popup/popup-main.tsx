"use client";

import {
  Book,
  Check,
  CreditCard,
  Crown,
  ExternalLink,
  LogOut,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { OnboardingTooltip } from "@/components/onboarding-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotebookLM } from "@/lib/notebooklm/api";
import type { Notebook } from "@/lib/notebooklm/types";
import { checkLimit, signOut } from "@/lib/supabase"; // Import checkLimit and signOut
import { AuthDialog } from "./auth-dialog";
import { BulkImport } from "./bulk-import";

// TODO: Replace with your actual Stripe links from the Dashboard
const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/test_28E28s8BcgZd2Td4Z6cfK00";
const STRIPE_CUSTOMER_PORTAL =
  "https://billing.stripe.com/p/login/test_28E28s8BcgZd2Td4Z6cfK00";

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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [usageInfo, setUsageInfo] = useState<{
    daily: number;
    monthly: number;
  } | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [showNotebookSelector, setShowNotebookSelector] = useState(false);

  const filteredNotebooks = notebooks.filter((nb) =>
    nb.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchUserStatus = async () => {
    setCheckingStatus(true);
    try {
      const status = await checkLimit();

      if (status.error) {
        console.error("Status check failed:", status.error);
        // If we have an auth error, we might want to show it, or at least log it.
        // If generic error, maybe don't block the UI if notebooks load fine.
        // But if it's "Authentication failed", we should probably warn.
        if (status.error.includes("Authentication failed")) {
          setError(status.error);
        }
      }

      setIsPro(status.isPro);
      if (status.userId) {
        setUserId(status.userId);
      }
      if (status.email) {
        setUserEmail(status.email);
      }
      // NOUVEAU : Stocker les remaining captures
      if (status.remaining) {
        setUsageInfo({
          daily: status.remaining.daily,
          monthly: status.remaining.monthly,
        });
      }

      // Check for pending auth state
      if (typeof chrome !== "undefined" && chrome.storage) {
        const result = await chrome.storage.local.get("authState");
        if (result.authState && result.authState.step === "OTP") {
          setShowAuthDialog(true);
        }
      }
    } catch (e: any) {
      console.error("Failed to check status:", e);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    fetchNotebooks();
    fetchUserStatus();
  }, []);

  // Wrap in useCallback to avoid stale closures in useEffect
  const handleNotebookSelect = useCallback((notebook: Notebook) => {
    setSelectedNotebookId(notebook.id);
    setShowNotebookSelector(false);

    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({
        lastNotebook: {
          id: notebook.id,
          title: notebook.title,
        },
      });
    }
  }, []);

  const handleCaptureCurrentPage = async () => {
    if (!selectedNotebookId) {
      setShowNotebookSelector(true);
      return;
    }
    if (!currentUrl) {
      setError("No URL found to capture.");
      return;
    }

    setAddingToNotebookId(selectedNotebookId);
    setError(null);
    try {
      await NotebookLM.addUrlSource(selectedNotebookId, [currentUrl]);

      if (typeof chrome !== "undefined" && chrome.notifications) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon-48.png",
          title: "Captured!",
          message: "Page added successfully.",
        });
      }

      setTimeout(() => window.close(), 1500);
    } catch (err: any) {
      if (err.name === "LimitReachedError") {
        setShowUpgradeModal(true);
      } else {
        setError(err.message || "Failed to add source");
      }
    } finally {
      setAddingToNotebookId(null);
    }
  };

  const handleBulkCapture = async (urls: string[]) => {
    if (!selectedNotebookId) {
      setShowNotebookSelector(true);
      return;
    }

    setAddingToNotebookId(selectedNotebookId);
    setError(null);
    try {
      console.log(
        `Adding ${urls.length} URLs to notebook ${selectedNotebookId}...`,
      );
      await NotebookLM.addUrlSource(selectedNotebookId, urls);

      if (typeof chrome !== "undefined" && chrome.notifications) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon-48.png",
          title: "Bulk Capture Complete!",
          message: `${urls.length} pages added to your notebook.`,
        });
      }

      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (err: any) {
      console.error("Bulk capture failed:", err);
      if (err.name === "LimitReachedError") {
        setShowUpgradeModal(true);
      } else {
        setError(err.message || "Bulk capture failed");
      }
    } finally {
      setAddingToNotebookId(null);
    }
  };

  // Restore last selected notebook from storage
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // ESC ferme le popup
      if (e.key === "Escape") {
        window.close();
      }

      // Enter pour sélectionner
      if (e.key === "Enter" && selectedNotebookId) {
        const found = notebooks.find((nb) => nb.id === selectedNotebookId);
        if (found) handleNotebookSelect(found);
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [selectedNotebookId, notebooks, handleNotebookSelect]);

  // Restore last selected notebook logic REMOVED based on user feedback
  /*
  useEffect(() => {
    ...
  }, [notebooks]);
  */

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserEmail(null);
      setIsPro(false);
      fetchUserStatus(); // Refresh status (will likely become anonymous)
    } catch (e) {
      console.error("Sign out failed:", e);
    }
  };

  const handleOpenNotebookLM = () => {
    window.open("https://notebooklm.google.com", "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="w-[650px] h-[500px] bg-background text-foreground flex flex-col font-sans">
      <header className="p-4 border-b flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-indigo-600" />
          <h1 className="font-semibold text-lg tracking-tight text-foreground">
            Send to NotebookLM
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {!checkingStatus && (
            <Badge
              variant={isPro ? "default" : "outline"}
              className={
                isPro
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "text-muted-foreground border-dashed cursor-pointer hover:bg-muted"
              }
              onClick={() =>
                !isPro &&
                window.open("https://send-to-notebooklm.com", "_blank")
              }
            >
              {isPro ? (
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-300" /> PRO
                </span>
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
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin text-indigo-600" : "text-muted-foreground"}`}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Settings"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isPro ? (
                <DropdownMenuItem
                  onClick={() => window.open(STRIPE_CUSTOMER_PORTAL, "_blank")}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50"
                  onClick={() => {
                    const baseUrl = STRIPE_PAYMENT_LINK;
                    const url = userId
                      ? `${baseUrl}?client_reference_id=${userId}`
                      : "https://send-to-notebooklm.com";
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
              {userEmail ? (
                <>
                  <DropdownMenuItem className="text-muted-foreground text-xs justify-center cursor-default bg-muted/50 focus:bg-muted/50">
                    {userEmail}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => setShowAuthDialog(true)}>
                    <Settings className="mr-2 h-4 w-4" /> Link Email / Restore
                    Purchase
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-muted-foreground text-xs justify-center cursor-default hover:bg-transparent">
                Version 1.1.1
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
            <Badge
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-800"
            >
              Free Tier
            </Badge>
          </div>
          <div className="mt-1 text-xs text-blue-600">
            Monthly: {usageInfo.monthly} / 200 remaining
          </div>
        </div>
      )}

      <main className="flex-1 min-h-0 flex flex-col p-4 overflow-hidden">
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
              <Card
                key={i}
                className="p-3 animate-pulse border-neutral-100 shadow-none"
              >
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
            {/* Global Notebook Selector */}
            <div className="px-1 mb-2">
              <button
                onClick={() => setShowNotebookSelector(true)}
                className={`w-full flex items-center justify-between p-2 rounded-lg border-2 transition-all group shrink-0
                  ${
                    selectedNotebookId
                      ? "bg-indigo-50/50 border-indigo-100 hover:border-indigo-300"
                      : "bg-muted/10 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50"
                  }`}
              >
                <div className="flex items-center gap-2 overflow-hidden text-left">
                  <div
                    className={`p-1.5 rounded-md ${selectedNotebookId ? "bg-indigo-100 text-indigo-600" : "bg-muted text-muted-foreground"}`}
                  >
                    <Book className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      Target Notebook
                    </span>
                    <span className="text-sm font-semibold truncate w-full">
                      {selectedNotebookId
                        ? notebooks.find((n) => n.id === selectedNotebookId)
                            ?.title
                        : "Select a notebook..."}
                    </span>
                  </div>
                </div>
                <div className="pl-2">
                  <div className="text-xs text-indigo-600 font-medium px-2 py-1 rounded hover:bg-indigo-100 transition-colors">
                    {selectedNotebookId ? "Change" : "Select"}
                  </div>
                </div>
              </button>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col min-h-0"
            >
              <TabsList className="grid w-full grid-cols-2 shrink-0 mb-2">
                <TabsTrigger value="current" className="text-xs">
                  Current Page
                </TabsTrigger>
                <TabsTrigger value="bulk" className="text-xs">
                  Bulk Import
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="current"
                className="flex-1 flex flex-col min-h-0 m-0 p-0 gap-4 outline-none data-[state=active]:flex"
              >
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="relative">
                    <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 animate-in fade-in zoom-in duration-500">
                      <ExternalLink className="h-8 w-8" />
                    </div>
                    {addingToNotebookId && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <RefreshCw className="h-10 w-10 text-indigo-600 animate-spin opacity-40" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">Save Current Page</h3>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {currentUrl || "No active page detected"}
                    </p>
                  </div>

                  <Button
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                    onClick={handleCaptureCurrentPage}
                    disabled={!!addingToNotebookId || !currentUrl}
                  >
                    {addingToNotebookId ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4 fill-current" />
                        Save Page
                      </>
                    )}
                  </Button>

                  {!selectedNotebookId && (
                    <p className="text-[10px] text-amber-600 font-medium">
                      * You must select a notebook above first
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="bulk"
                className="flex-1 flex flex-col min-h-0 m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col outline-none"
              >
                <BulkImport
                  onCapture={handleBulkCapture}
                  isPro={isPro}
                  remainingQuotas={usageInfo?.daily ?? null}
                  isAdding={!!addingToNotebookId && selectedNotebookId !== null}
                />
              </TabsContent>
            </Tabs>
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
                const baseUrl = STRIPE_PAYMENT_LINK;
                const stripeLink = userId
                  ? `${baseUrl}?client_reference_id=${userId}`
                  : baseUrl;
                window.open(stripeLink, "_blank");
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

      <Dialog
        open={showNotebookSelector}
        onOpenChange={setShowNotebookSelector}
      >
        <DialogContent className="max-w-sm p-4 h-[400px] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-lg">Select Notebook</DialogTitle>
          </DialogHeader>

          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notebooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="flex-1 min-h-0 border rounded-md">
            <div className="p-2 space-y-2">
              {searchQuery.trim().length > 0 && (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                  onClick={async () => {
                    const title = searchQuery.trim();
                    setLoading(true);
                    try {
                      const newNotebook =
                        await NotebookLM.createNotebook(title);
                      setNotebooks((prev) => [newNotebook, ...prev]);
                      handleNotebookSelect(newNotebook);
                      setSearchQuery("");
                    } catch (err: any) {
                      setError(err.message || "Failed to create notebook");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <Badge className="bg-indigo-600 text-white">+</Badge>
                  <span className="truncate">
                    Create "<strong>{searchQuery}</strong>"
                  </span>
                </Button>
              )}

              {filteredNotebooks.length === 0 &&
              searchQuery.trim().length === 0 ? (
                <div className="text-center py-10 text-sm text-muted-foreground">
                  Type to search...
                </div>
              ) : (
                filteredNotebooks.map((nb) => (
                  <div
                    key={nb.id}
                    onClick={() => handleNotebookSelect(nb)}
                    className={`p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between group
                            ${selectedNotebookId === nb.id ? "bg-indigo-50 border-indigo-200" : "hover:border-indigo-100 hover:bg-neutral-50"}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Book
                        className={`h-4 w-4 ${selectedNotebookId === nb.id ? "text-indigo-600" : "text-muted-foreground"}`}
                      />
                      <span className="text-sm font-medium truncate">
                        {nb.title}
                      </span>
                    </div>
                    {selectedNotebookId === nb.id && (
                      <Check className="h-4 w-4 text-indigo-600 shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onLoginSuccess={() => fetchUserStatus()}
      />
      <OnboardingTooltip />
    </div>
  );
}
