import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  open: boolean;
  videoId: string;
  title?: string;
  onClose: () => void;
}

/**
 * Centered popup that autoplays a YouTube Short (9:16). Esc / click-outside /
 * close button dismiss it. The iframe is unmounted when closed so playback (and
 * audio) stops completely.
 */
export default function VideoModal({
  open,
  videoId,
  title = "Video",
  onClose,
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,.9)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            className="relative w-[min(420px,92vw)]"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition hover:text-muted"
              aria-label="Close video"
            >
              <X size={16} /> Close
            </button>
            <div
              className="overflow-hidden rounded-card bg-black shadow-2xl"
              style={{ aspectRatio: "9 / 16" }}
            >
              <iframe
                className="h-full w-full border-0"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
