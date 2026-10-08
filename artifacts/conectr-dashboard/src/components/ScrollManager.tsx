import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "wouter";

// The router swaps pages without a reload, so the browser never resets the scroll.
// New navigations start at the top (or at #hash); back/forward restores where the user was.
const savedPositions = new Map<string, number>();
let lastNavigation: "push" | "pop" = "push";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  // Registered at module load so it runs before the router reacts to the same event
  window.addEventListener("popstate", () => {
    lastNavigation = "pop";
  });
}

function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  target?.scrollIntoView();
  return Boolean(target);
}

// Layout can still shift right after a page renders (sticky header resizing, animations),
// so re-apply the position a few times unless the user starts scrolling on their own.
function settleScroll(apply: () => void) {
  apply();
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const events = ["wheel", "touchstart", "keydown"] as const;
  events.forEach((e) => window.addEventListener(e, cancel, { once: true, passive: true }));
  const timers = [50, 200, 450].map((ms) => window.setTimeout(() => !cancelled && apply(), ms));
  window.setTimeout(() => events.forEach((e) => window.removeEventListener(e, cancel)), 500);
  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

export default function ScrollManager() {
  const [location] = useLocation();
  const currentRef = useRef(location);
  const restoringRef = useRef(false);

  useEffect(() => {
    const save = () => {
      if (!restoringRef.current) savedPositions.set(currentRef.current, window.scrollY);
    };
    window.addEventListener("scroll", save, { passive: true });
    // Direct visit to a URL with #hash: jump once the page has rendered
    if (window.location.hash) settleScroll(() => void scrollToHash());
    return () => window.removeEventListener("scroll", save);
  }, []);

  useLayoutEffect(() => {
    if (location === currentRef.current) return;
    currentRef.current = location;

    if (lastNavigation === "pop") {
      lastNavigation = "push";
      const y = savedPositions.get(location) ?? 0;
      restoringRef.current = true;
      const stop = settleScroll(() => window.scrollTo({ top: y, behavior: "instant" }));
      const done = window.setTimeout(() => {
        restoringRef.current = false;
      }, 500);
      return () => {
        stop();
        clearTimeout(done);
        restoringRef.current = false;
      };
    }

    if (!window.location.hash || !scrollToHash()) window.scrollTo({ top: 0, behavior: "instant" });
    return undefined;
  }, [location]);

  return null;
}
