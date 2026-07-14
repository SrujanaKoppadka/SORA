import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function AnimatedText({
  text,
  className = '',
  el: Wrapper = 'p',
  delay = 0
}) {
  const textRef = useRef(null);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Simple split by words
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';
      span.style.paddingRight = '0.25em';
      const innerSpan = document.createElement('span');
      innerSpan.style.display = 'inline-block';
      innerSpan.style.transform = 'translateY(100%)';
      innerSpan.textContent = word;
      span.appendChild(innerSpan);
      el.appendChild(span);
    });
    const innerSpans = el.querySelectorAll('span > span');
    gsap.to(innerSpans, {
      y: '0%',
      ease: 'power4.out',
      duration: 1.2,
      stagger: 0.05,
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [text, delay]);
  return <Wrapper ref={textRef} className={className}>{text}</Wrapper>;
}