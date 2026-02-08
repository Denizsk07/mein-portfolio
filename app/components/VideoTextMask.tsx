'use client';

import React from 'react';

export const VideoTextMask = ({ text, videoUrl, className = "" }: { text: string, videoUrl: string, className?: string }) => {
    return (
        <div className={`relative overflow-hidden group ${className}`}>
            <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase relative z-10 text-transparent bg-clip-text bg-white mix-blend-overlay opacity-90 select-none">
                {text}
            </h1>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none mix-blend-screen opacity-50 contrast-125"
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Fallback/Overlay for readability */}
            <div className="absolute inset-0 bg-transparent mix-blend-overlay pointer-events-none" />
        </div>
    );
};

export const HeroVideoTitle = () => {
    return (
        <div className="relative">
            <h1 className="text-[13vw] leading-[0.8] font-black tracking-tighter uppercase text-center">
                <span className="block text-white/20 mix-blend-difference drop-shadow-sm filter blur-[0.5px]">DENIZ</span>
                <span className="block relative text-transparent bg-clip-text bg-cover bg-center"
                    style={{ backgroundImage: "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjJ5Znl5aDhuZml5Z3J5aDhuZml5Z3J5aDhuZml5Z3J5aDhuZml5Z3J5aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKrEzvJbsBAudPf/giphy.gif')" }}>
                    KAYA
                    <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </span>
            </h1>
        </div>
    )
}
