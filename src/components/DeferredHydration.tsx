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

 const idleId = 'requestIdleCallback' in window
 ? (window as any).requestIdleCallback(() => setShouldRender(true), { timeout: 3000 })
 : setTimeout(() => setShouldRender(true), 2500);

 return () => {
 observer.disconnect();
 if ('cancelIdleCallback' in window) {
 (window as any).cancelIdleCallback(idleId);
 } else {
 clearTimeout(idleId);
 }
 };
 }, [rootMargin]);

 return (
 <div ref={containerRef}>
 {shouldRender ? children : fallback}
 </div>
 );
}
