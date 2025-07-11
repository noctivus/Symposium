import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const animate = () => {
      currentX.current += (mouseX.current - currentX.current) * 0.15;
      currentY.current += (mouseY.current - currentY.current) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          currentX.current - 20
        }px, ${currentY.current - 20}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white transition-transform duration-75 ease-out"
    />
  );
};

export default CustomCursor;
