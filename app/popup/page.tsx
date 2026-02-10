"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import PopupMain with no SSR to fix hydration errors in Extension context
const PopupMain = dynamic(() => import("@/components/popup/popup-main"), {
  ssr: false,
  loading: () => <PopupSkeleton />,
});

export default function PopupPage() {
  return <PopupMain />;
}

function PopupSkeleton() {
  return (
    <div className="w-[650px] h-[500px] bg-background text-foreground flex flex-col font-sans p-4 space-y-4">
      <div className="h-14 border-b flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
