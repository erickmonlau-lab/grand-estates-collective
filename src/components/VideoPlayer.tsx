import React, { useState } from "react";
import { Play, X } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  title?: string;
  thumbnailUrl?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  title = "Ver recorrido en vídeo",
  thumbnailUrl,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-slate-900 border border-slate-700/50 shadow-xl transition-all hover:scale-[1.02] ${className}`}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity"
          />
        ) : (
          <div className="w-full h-full min-h-[220px] bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center" />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3 backdrop-blur-sm border border-blue-400/30">
            <Play className="w-7 h-7 fill-current ml-1" />
          </div>
          <span className="text-white font-semibold text-sm tracking-wide bg-slate-900/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {title}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Cerrar vídeo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={videoUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
