'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CompareSliderProps {
    beforeDetails?: { type: 'image' | 'video', src: string, label?: string };
    afterDetails: { type: 'image' | 'video', src: string, label?: string };
}

export default function CompareSlider({ beforeDetails, afterDetails }: CompareSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        let clientX;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as React.MouseEvent).clientX;
        }

        const position = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, position)));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                // @ts-ignore
                handleMove(e);
            }
        };
        const handleGlobalUp = () => setIsDragging(false);

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchmove', handleGlobalMove);
        window.addEventListener('touchend', handleGlobalUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, [isDragging]);


    // If no specific "Before" source is provided, use the "After" source but apply a CSS filter to simulate LOG footage
    // High-end Log Simulation: Low contrast, desaturated, lifted blacks.
    const beforeSrc = beforeDetails?.src || afterDetails.src;
    const isSimulatedLog = !beforeDetails?.src;
    const filterStyle = isSimulatedLog ? { filter: 'grayscale(0.4) contrast(0.8) brightness(1.1) sepia(0.2)' } : {};

    return (
        <div
            className="relative w-full aspect-video overflow-hidden rounded-xl border border-white/10 select-none group cursor-ew-resize"
            ref={containerRef}
            onMouseDown={(e) => { handleMove(e); handleMouseDown(); }}
            onTouchStart={(e) => { handleMove(e); handleMouseDown(); }}
        >
            {/* AFTER IMAGE (Background - Full Opacity) */}
            <div className="absolute inset-0 w-full h-full">
                {afterDetails.type === 'video' ? (
                    <video src={afterDetails.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                    <img src={afterDetails.src} alt="After" className="w-full h-full object-cover" />
                )}
                <span className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 text-xs font-bold text-white rounded">
                    {afterDetails.label || 'GRADED'}
                </span>
            </div>

            {/* BEFORE IMAGE (Clipped on top) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-neon-green"
                style={{ width: `${sliderPosition}%` }}
            >
                <div className="absolute inset-0 w-full h-full" style={{ width: '100vw' }}> {/* Fix width to prevent squishing */}
                    {/* We need to ensure this inner container matches the parent aspect ratio and size exactly so the image aligns */}
                    <div className="w-full h-full relative" style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}>
                        {afterDetails.type === 'video' ? (
                            <video
                                src={beforeSrc}
                                autoPlay muted loop playsInline
                                className="w-full h-full object-cover"
                                style={filterStyle}
                            />
                        ) : (
                            <img
                                src={beforeSrc}
                                alt="Before"
                                className="w-full h-full object-cover"
                                style={filterStyle}
                            />
                        )}
                    </div>
                </div>
                <span className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 text-xs font-bold text-white rounded">
                    {beforeDetails?.label || 'RAW / LOG'}
                </span>
            </div>

            {/* SLIDER HANDLE */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-neon-green cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

        </div>
    );
}
