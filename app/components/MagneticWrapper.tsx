'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

/**
 * MagneticWrapper
 * Wraps any element to give it a "magnetic" effect towards the mouse cursor.
 * 
 * @param children - The element to wrap (usually a button or link)
 * @param strength - How strong the pull is (default: 0.5)
 */
export default function MagneticWrapper({
    children,
    strength = 0.5
}: {
    children: React.ReactElement;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const center = { x: left + width / 2, y: top + height / 2 };

        // Calculate distance from center
        const distance = { x: clientX - center.x, y: clientY - center.y };

        // Apply magnetic force
        x.set(distance.x * strength);
        y.set(distance.y * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className="inline-block"
        >
            {React.cloneElement(children, {
                style: { ...children.props.style }
            })}
        </motion.div>
    );
}
