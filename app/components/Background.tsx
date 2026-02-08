import React from "react";

export function Background() {
  return (
    <div className="absolute inset-0 min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 bg-dot-blue-400/[0.2] bg-dot-blue-500/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
