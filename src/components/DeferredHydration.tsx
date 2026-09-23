import React, { useState, useEffect, useRef } from 'react';

export function DeferredHydration({
  children,
  fallback = <div className="h-96 w-full" />,
  rootMargin = '300px',
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Hydrate immediately on user interaction or scroll
    const handleInteraction = () => {
      setShouldRender(true);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [rootMargin]);

  return (
    <div ref={containerRef}>
      {shouldRender ? children : fallback}
    </div>
  );
}
