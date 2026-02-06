"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { decodeState } from "@/lib/url-state";
import { useSearchParams, useRouter } from "next/navigation";

export const UrlHydrator = () => {
  const importState = useChatStore((state) => state.importState);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const stateStr = searchParams.get("s");
    if (stateStr) {
      const decoded = decodeState(stateStr);
      if (decoded) {
        importState(decoded);
        // Clean URL after hydration to look nice
        router.replace("/", { scroll: false }); 
      }
    }
  }, [searchParams, importState, router]);

  return null;
};
