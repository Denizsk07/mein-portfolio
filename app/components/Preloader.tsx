'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
    "BIOS Check... OK",
    "Loading Kernel Modules...",
    "Mounting VFS...",
    "Initializing GPU Drivers... NVIDIA_RTX_ENABLED",
    "Loading Audio Subsystem... OK",
    "Allocating Memory... 64GB OK",
    "Connecting to Mainframe...",
    "Decryption Key Found...",
    "Accessing Portfolio Database...",
    "Rendering Interface...",
    "Welcome, User."
];

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        // Progress Bar Logic
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                // Random speed variance
                return prev + Math.floor(Math.random() * 3) + 1;
            });
        }, 30);

        // Log Sequence Logic
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < bootSequence.length) {
                setLogs(prev => [...prev.slice(-6), bootSequence[logIndex]]); // Keep last 7 logs
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 250);

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono text-white cursor-none overflow-hidden"
                >
                    {/* Background Grid (Static) */}
                    <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                    <div className="z-10 w-full max-w-md p-6 relative">
                        {/* Glitch Title */}
                        <div className="flex justify-between items-end mb-2 border-b border-neon-green/30 pb-2">
                            <h1 className="text-xl font-black uppercase tracking-tighter text-neon-green" style={{ textShadow: '0 0 10px rgba(204,255,0,0.5)' }}>
                                DENIZ KAYA <span className="text-white text-xs align-top opacity-50">v2.0</span>
                            </h1>
                            <span className="text-4xl font-bold">{progress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-neutral-900 overflow-hidden mb-8 relative">
                            <motion.div
                                className="h-full bg-neon-green relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-0 bottom-0 w-[20px] bg-white opacity-50 blur-[5px]" />
                            </motion.div>
                        </div>

                        {/* Terminal Logs */}
                        <div className="font-mono text-xs space-y-1 h-[150px] overflow-hidden flex flex-col justify-end">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-neutral-400"
                                >
                                    <span className="text-neon-green mr-2">{`>`}</span>
                                    {log}
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative Footer */}
                        <div className="absolute -bottom-12 left-0 right-0 flex justify-between text-[8px] text-neutral-600 uppercase tracking-[0.2em]">
                            <span>Mem: 64429MB</span>
                            <span>Sys: Online</span>
                            <span>Enc: Secure</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
