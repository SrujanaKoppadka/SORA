import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';
export function SmoothScroll({
  children
}) {
  return <ReactLenis root options={{
    lerp: 0.05,
    duration: 1.5,
    smoothWheel: true
  }}>
      {children}
    </ReactLenis>;
}