import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true); // start muted to satisfy autoplay policies
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<any>(null);
  const hasStartedPlayingRef = useRef(false);
  const [shouldStartPlayback, setShouldStartPlayback] = useState(false);
  const userMutedRef = useRef(false); // resets on each page load

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Detect when section approaches viewport (fallback trigger)
  const { scrollYProgress: visibilityProgress } = useScroll({
    target: sectionRef,
    offset: ["start 100vh", "start 0vh"]
  });

  // Smooth spring animations matching SunriseReveal's physics
  const springConfig = { damping: 15, stiffness: 50, mass: 0.5 };

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]),
    springConfig
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.95, 1]),
    springConfig
  );

  // Monitor when video section becomes visible and queue playback
  useEffect(() => {
    const unsubscribe = visibilityProgress.on('change', (latest) => {
      if (latest > 0.25) {
        setShouldStartPlayback(true);
      }
    });

    return () => unsubscribe();
  }, [visibilityProgress]);

  // Begin playback when the SunriseReveal animation is ~90% complete
  useEffect(() => {
    const handleSunriseProgress = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === 'number' && detail >= 0.9) {
        setShouldStartPlayback(true);
      }
    };

    window.addEventListener('sunrise-near-complete', handleSunriseProgress as EventListener);
    return () => {
      window.removeEventListener('sunrise-near-complete', handleSunriseProgress as EventListener);
    };
  }, []);

  // YouTube video ID extracted from the URL
  const videoId = "GibiNy4d4gc";

  // Attempt to start playback once a trigger fires and the player is ready
  useEffect(() => {
    if (shouldStartPlayback && playerRef.current && !hasStartedPlayingRef.current) {
      // Ensure muted before playing to avoid autoplay blocking
      playerRef.current.mute();
      playerRef.current.playVideo();
    }
  }, [shouldStartPlayback, player]);

  // Initialize YouTube IFrame API
  useEffect(() => {
    let mounted = true;

    // Function to create the player
    const createPlayer = () => {
      if (!mounted) return;

      const playerElement = document.getElementById('youtube-player');
      if (!playerElement) {
        console.error('Player element not found');
        return;
      }

      try {
        new (window as any).YT.Player('youtube-player', {
          events: {
            onReady: (event: any) => {
              if (!mounted) return;
              playerRef.current = event.target;
              setPlayer(event.target);
              // Immediately mute on ready to keep autoplay unblocked
              event.target.mute();
            },
            onStateChange: (event: any) => {
              if (!mounted) return;
              // When video starts playing, fade in sound
              if (event.data === (window as any).YT.PlayerState.PLAYING && !hasStartedPlayingRef.current) {
                hasStartedPlayingRef.current = true;

                const wantsSound = !userMutedRef.current; // auto-unmute every load unless user muted this session
                if (wantsSound) {
                  event.target.unMute();
                  setIsMuted(false);

                  let volume = 0;
                  event.target.setVolume(0);

                  const fadeInterval = setInterval(() => {
                    volume += 10;
                    if (volume >= 100) {
                      volume = 100;
                      clearInterval(fadeInterval);
                    }
                    event.target.setVolume(volume);
                  }, 80); // 10 steps * 80ms = 800ms total fade
                }
              }
            }
          }
        });
      } catch (error) {
        console.error('Error creating YouTube player:', error);
      }
    };

    // Check if YouTube API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      // API already loaded, create player immediately
      createPlayer();
    } else {
      // Load YouTube IFrame API if not already present
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // Set up callback for when API is ready
      (window as any).onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      mounted = false;
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, []);

  // Toggle mute/unmute
  const toggleSound = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
        userMutedRef.current = false;
      } else {
        playerRef.current.mute();
        setIsMuted(true);
        userMutedRef.current = true;
      }
    }
  };

  // YouTube embed parameters for immersive experience (manual playback trigger)
  const embedParams = new URLSearchParams({
    autoplay: '0', // We'll start manually when sunrise sequence is nearly done
    mute: '0', // Allow user to control sound
    loop: '1',
    playlist: videoId, // Required for loop to work
    controls: '1', // Show YouTube controls so user can play
    modestbranding: '1',
    rel: '0',
    showinfo: '0',
    iv_load_policy: '3',
    playsinline: '1',
    enablejsapi: '1',
    vq: 'hd1080' // Request HD quality
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-slate-950"
    >
      {/* Animated video container */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 w-full h-full"
      >
        {/* YouTube iframe - positioned to fill and overflow for true fullscreen */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            id="youtube-player"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100vw',
              height: '100vh',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover'
            }}
            src={`https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`}
            title="The Last Sunrise"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Top gradient overlay - blends from SunriseReveal */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950 via-slate-950/50 to-transparent z-10 pointer-events-none" />

        {/* Bottom gradient overlay - blends into closing section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10 pointer-events-none" />

        {/* Cinematic vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-transparent to-slate-950/20 z-10 pointer-events-none" />

        {/* Subtle side darkening for focus */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950/40 to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* Optional text overlay with cinematic styling */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
      >
        <h3 className="cinematic-font text-4xl md:text-5xl text-white tracking-[0.3em] uppercase drop-shadow-2xl">
          The New Year Beckons
        </h3>
        <div className="mt-4 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
      </motion.div>

      {/* Sound toggle button - top right corner */}
      <motion.button
        style={{ opacity }}
        onClick={toggleSound}
        className="interactive absolute top-8 right-8 z-30 group"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        <div className="relative">
          {/* Glassmorphic background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-orange-400/30 group-hover:shadow-[0_0_30px_rgba(251,146,60,0.3)]" />

          {/* Button content */}
          <div className="relative px-6 py-4 flex items-center gap-3">
            {/* Sound icon */}
            <svg
              className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMuted ? (
                // Muted icon
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </>
              ) : (
                // Unmuted icon with sound waves
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </>
              )}
            </svg>

            {/* Text label */}
            <span className="text-xs tracking-[0.2em] uppercase text-white font-medium transition-colors duration-300 group-hover:text-orange-400">
              {isMuted ? 'Sound Off' : 'Sound On'}
            </span>

            {/* Pulse indicator when sound is on */}
            {!isMuted && (
              <motion.div
                className="w-2 h-2 rounded-full bg-orange-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-full bg-orange-400/0 group-hover:bg-orange-400/5 transition-colors duration-300 pointer-events-none" />
        </div>
      </motion.button>

    </section>
  );
};

export default VideoSection;
