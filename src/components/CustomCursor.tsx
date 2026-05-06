import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const move = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      inner.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };

    const setInteractive = (enabled: boolean) => {
      outer.dataset.interactive = String(enabled);
      inner.dataset.interactive = String(enabled);
    };

    const pointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setInteractive(Boolean(target.closest('button, a, input, textarea, select, [role="button"], [data-clickable], .clickable')));
    };

    const pointerDown = () => {
      outer.dataset.clicking = 'true';
      inner.dataset.clicking = 'true';
    };

    const pointerUp = () => {
      outer.dataset.clicking = 'false';
      inner.dataset.clicking = 'false';
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.18;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.18;
      outer.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', pointerOver, { passive: true });
    window.addEventListener('pointerdown', pointerDown, { passive: true });
    window.addEventListener('pointerup', pointerUp, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', pointerOver);
      window.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('pointerup', pointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="custom-cursor custom-cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="custom-cursor custom-cursor-inner" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
