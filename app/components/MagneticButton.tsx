'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
    children,
    className = "",
    onClick
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-block ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
