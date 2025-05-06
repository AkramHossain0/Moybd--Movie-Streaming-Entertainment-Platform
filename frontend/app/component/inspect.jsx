"use client";
import { useEffect } from "react";

export default function DisableInspect() {
  useEffect(() => {
    const preventRightClick = (e) => e.preventDefault();

    const preventDevToolsShortcuts = (e) => {
      const blockedKeys = new Set([
        "F12",
        "I",
        "C",
        "U",
      ]);

      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && blockedKeys.has(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventRightClick);
    document.addEventListener("keydown", preventDevToolsShortcuts);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("keydown", preventDevToolsShortcuts);
    };
  }, []);

  return null;
}