"use client";

import { useEffect } from "react";
import { useChatStore, Platform } from "@/store/useChatStore";
import { decodeState } from "@/lib/url-state";
import { useSearchParams, useRouter } from "next/navigation";

export const UrlHydrator = () => {
  const importState = useChatStore((state) => state.importState);
  const setPlatform = useChatStore((state) => state.setPlatform);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const stateStr = searchParams.get("s");
    const platformStr = searchParams.get("platform");

    if (stateStr) {
      const decoded = decodeState(stateStr);
      if (decoded) {
        importState(decoded);
        // Clean URL after hydration to look nice and ensure we are in the editor
        router.replace("/editor", { scroll: false }); 
      }
    } else if (platformStr) {
      // Handle setting platform from the landing page
      setPlatform(platformStr as Platform);
      // Clean URL after setting platform
      router.replace("/editor", { scroll: false });
    }
  }, [searchParams, importState, setPlatform, router]);

  return null;
};
