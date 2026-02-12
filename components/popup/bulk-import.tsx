"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Layers, AlertCircle } from "lucide-react";

interface TabInfo {
  id: number;
  url: string;
  title: string;
  favIconUrl?: string;
}

interface BulkImportProps {
  onCapture: (urls: string[]) => Promise<void>;
  isPro: boolean;
  remainingQuotas: number | null;
  isAdding: boolean;
}

export function BulkImport({ onCapture, isPro, remainingQuotas, isAdding }: BulkImportProps) {
  const [tabs, setTabs] = useState<TabInfo[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true }, (result) => {
        const filtered = result
          .filter(tab => tab.id !== undefined && tab.url?.startsWith("http"))
          .map(tab => ({
            id: tab.id!,
            url: tab.url!,
            title: tab.title || "Untitled",
            favIconUrl: tab.favIconUrl
          }));
        setTabs(filtered);
        setSelectedIds(new Set(filtered.map(t => t.id)));
        setLoading(false);
      });
    } else {
      // Mock for development mode
      const mockTabs = [
        { id: 1, url: "https://google.com", title: "Google" },
        { id: 2, url: "https://github.com", title: "GitHub" },
        { id: 3, url: "https://example.com/long-page-titles-are-truncated-properly", title: "Example Page With A Very Long Title That Should Be Truncated" }
      ];
      setTimeout(() => {
        setTabs(mockTabs);
        setSelectedIds(new Set(mockTabs.map(t => t.id)));
        setLoading(false);
      }, 500);
    }
  }, []);

  const toggleTab = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === tabs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(tabs.map(t => t.id)));
    }
  };

  const selectedCount = selectedIds.size;
  // remainingQuotas represents total left (daily/monthly minimum)
  const isOverLimit = !isPro && remainingQuotas !== null && selectedCount > remainingQuotas;

  const handleCapture = () => {
    const urls = tabs.filter(t => selectedIds.has(t.id)).map(t => t.url);
    onCapture(urls);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 gap-3">
      <div className="flex items-center justify-between px-1 shrink-0">
        <div className="flex flex-col">
           <span className="text-sm font-medium text-muted-foreground">Select pages to import</span>
           {tabs.length > 0 && (
             <button 
                onClick={toggleAll}
                className="text-[10px] text-indigo-600 hover:underline text-left font-medium"
             >
               {selectedIds.size === tabs.length ? "Deselect All" : "Select All"}
             </button>
           )}
        </div>
        <Badge variant="secondary" className="h-5 text-[10px] font-mono">{tabs.length} tabs</Badge>
      </div>

      <ScrollArea className="flex-1 min-h-0 w-full border rounded-md bg-card/50">
        <div className="p-2 space-y-1">
          {loading ? (
             <div className="text-center py-12 text-sm text-muted-foreground animate-pulse">Loading tabs...</div>
          ) : tabs.length === 0 ? (
             <div className="text-center py-12 text-sm text-muted-foreground">No captureable tabs found.</div>
          ) : (
            tabs.map((tab) => (
              <div 
                key={tab.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/80 transition-colors cursor-pointer group"
                onClick={() => toggleTab(tab.id)}
              >
                <Checkbox 
                  checked={selectedIds.has(tab.id)} 
                  onCheckedChange={() => toggleTab(tab.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {tab.favIconUrl ? (
                    <img src={tab.favIconUrl} className="w-4 h-4 object-contain" alt="" />
                  ) : (
                    <Layers className="w-4 h-4 text-muted-foreground/50" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate group-hover:text-indigo-600 transition-colors">
                    {tab.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground truncate opacity-60 font-mono">
                    {tab.url}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="space-y-3 shrink-0">
        {isOverLimit && (
          <div className="flex items-start gap-2 p-2 bg-red-50 border border-red-100 rounded-md text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
            <p className="text-[11px] leading-tight">
              <strong>Limit Reached:</strong> You have {remainingQuotas} captures left. 
              Selecting {selectedCount} pages requires Pro tier.
            </p>
          </div>
        )}

        <Button 
          className="w-full h-12 text-base font-semibold shadow-indigo-100 shadow-md bg-indigo-600 hover:bg-indigo-700" 
          disabled={selectedCount === 0 || isOverLimit || isAdding || loading}
          onClick={handleCapture}
        >
          {isAdding ? (
             <span className="flex items-center gap-2">
               Saving {selectedCount} items...
             </span>
          ) : (
             <>Save {selectedCount} {selectedCount > 1 ? 'Pages' : 'Page'} to Notebook</>
          )}
        </Button>
      </div>
    </div>
  );
}
