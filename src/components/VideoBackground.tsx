import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Full-bleed billboard background:
 * - z0 fallback gradient (shows while loading / if media is blocked)
 * - z1 media: native <video> (object-cover) when `mp4` is set, else a YouTube
 *   iframe sized to cover. Autoplay is always muted (browser policy).
 * - z4 Unmute pill (bottom-right): the one-click path to sound. <video> flips
 *   .muted; YouTube toggles via postMessage (needs enablejsapi=1).
 * Returns a fragment so the Unmute button can stack above the billboard content.
 */
export default function VideoBackground({
  mp4,
  youtubeId,
  poster,
  fallback,
}: {
  mp4?: string | null;
  youtubeId?: string | null;
  poster?: string | null;
  fallback: string;
}) {
  const [muted, setMuted] = useState(true);
  const [mp4Failed, setMp4Failed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const usingMp4 = Boolean(mp4) && !mp4Failed;
  const hasMedia = usingMp4 || Boolean(youtubeId);

  const ytCommand = (func: string) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    if (usingMp4) {
      const v = videoRef.current;
      if (v) {
        v.muted = next;
        if (!next) void v.play().catch(() => undefined);
      }
    } else {
      ytCommand(next ? "mute" : "unMute");
    }
  };

  const ytSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}` +
      `?autoplay=1&mute=1&loop=1&playlist=${youtubeId}` +
      `&controls=0&modestbranding=1&playsinline=1&enablejsapi=1&rel=0&iv_load_policy=3`
    : "";

  return (
    <>
      {/* z0 fallback gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: fallback }}
      />

      {/* z1 media */}
      {usingMp4 ? (
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster || undefined}
          onError={() => setMp4Failed(true)}
        >
          <source src={mp4 as string} type="video/mp4" />
        </video>
      ) : youtubeId ? (
        <iframe
          ref={iframeRef}
          className="cinematic-media z-[1]"
          src={ytSrc}
          title="Background video"
          allow="autoplay; encrypted-media"
        />
      ) : null}

      {/* z4 unmute */}
      {hasMedia && (
        <button
          onClick={toggle}
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
          className="absolute bottom-5 right-5 z-40 inline-flex h-10 items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-4 text-sm font-semibold text-fg backdrop-blur transition hover:bg-black/60"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {muted ? "Unmute" : "Mute"}
        </button>
      )}
    </>
  );
}
