"use client";

import { Book, Check, ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { NotebookLM } from "@/lib/notebooklm/api";
import type { Notebook } from "@/lib/notebooklm/types";

export default function Popup() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(null);
  const [addingToNotebookId, setAddingToNotebookId] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

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
        setTimeout(() => reject(new Error("Request timed out (10s)")), 10000)
      );

      const nbs = await Promise.race([
        NotebookLM.listNotebooks(),
        timeoutPromise
      ]) as Notebook[];

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

  useEffect(() => {
    fetchNotebooks();
  }, []);

  // Restore last selected notebook from storage
  useEffect(() => {
    if (notebooks.length === 0 || typeof chrome === "undefined" || !chrome.storage) return;

    chrome.storage.local.get("lastNotebook", (result) => {
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
      
      if (err.name === 'LimitReachedError') {
        setError("Daily limit reached ⚡");
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
      <header className="p-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          {/* Icon would go here */}
          <h1 className="font-semibold text-lg">Send to NotebookLM</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchNotebooks}
          disabled={loading}
          title="Refresh"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </header>

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
            <Skeleton className="h-[60px] w-full rounded-xl" />
            <Skeleton className="h-[60px] w-full rounded-xl" />
            <Skeleton className="h-[60px] w-full rounded-xl" />
            <Skeleton className="h-[60px] w-full rounded-xl" />
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
                      className={`cursor-pointer transition-all hover:bg-muted/50 mx-1 ${selectedNotebookId === nb.id ? "border-primary ring-1 ring-primary" : ""} ${addingToNotebookId === nb.id ? "opacity-70 pointer-events-none" : ""}`}
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
                        {selectedNotebookId === nb.id && addingToNotebookId !== nb.id && (
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

      <footer className="p-3 border-t bg-card text-center text-xs text-muted-foreground">
        Version 0.1.0 • Unofficial Extension
      </footer>
    </div>
  );
}
