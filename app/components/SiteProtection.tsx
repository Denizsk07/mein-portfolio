'use client';

import { useEffect } from 'react';

export default function SiteProtection() {
    useEffect(() => {
        // Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Disable Keyboard Shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
            }
            // Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
            }
            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
            }
            // Ctrl+Shift+C (Element Inspector)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
            }
            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
}
