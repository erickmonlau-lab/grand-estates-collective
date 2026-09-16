import { useState, useEffect, useRef, type ReactNode } from "react";

export function DeferredSection({
  children,
  minHeight = "400px",
  rootMargin = "300px",
}: {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
}
