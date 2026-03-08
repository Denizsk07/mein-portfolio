'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on admin pages or mobile (touch devices don't need cursors)
        if (pathname?.startsWith('/admin') || window.innerWidth <= 768) {
            document.body.style.cursor = 'auto'; // Ensure standard cursor
            return;
        }

        document.body.style.cursor = 'none';

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;
        let isHovering = false;
        let currentScale = 1;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly update the center dot
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                isHovering = true;
            } else {
                isHovering = false;
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        let animationFrameId: number;

        const render = () => {
            // Lerp logic for the outer ring (smooth trailing effect WITHOUT bouncing)
            cursorX += (mouseX - cursorX) * 0.15; // 0.15 is the speed/tightness of the follow
            cursorY += (mouseY - cursorY) * 0.15;
            
            // Lerp the scale to avoid CSS transitions fighting JS frames
            const targetScale = isHovering ? 2.5 : 1;
            currentScale += (targetScale - currentScale) * 0.15;
            
            // Adjust translation to center the 32x32 circle (-16px)
            cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0) scale(${currentScale})`;

            animationFrameId = requestAnimationFrame(render);
        };
        
        // Start animation loop
        requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
            document.body.style.cursor = 'auto'; // Reset cursor on unmount
        };
    }, [pathname]);

    if (pathname?.startsWith('/admin')) {
        return null; // Do not render elements on admin page
    }

    return (
        <>
            <div 
                ref={cursorRef} 
                className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-white rounded-full pointer-events-none z-[10000] hidden md:block mix-blend-difference"
                style={{ transform: 'translate3d(-100px, -100px, 0)', willChange: 'transform' }}
            />
            <div 
                ref={dotRef} 
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] hidden md:block mix-blend-difference"
                style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)', willChange: 'transform' }}
            />
        </>
    );
}
