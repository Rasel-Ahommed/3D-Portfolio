import { useEffect, useMemo, useState } from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Nav } from '../components/navigation/Nav';
import { Footer } from '../components/footer/Footer';
import { Preloader } from '../components/common/Preloader';
import { BackgroundLayer, loadExperience } from '../components/common/BackgroundLayer';
import { useSmoothScroll } from '../components/common/SmoothScroll';
import { ScrollTrigger } from '../animations/gsap';
import { sceneState, uiStore, type SceneMode } from '../scenes/store';
import { detectQuality, hasWebGL, prefersReducedMotion } from '../utils/env';

const EASE = [0.76, 0, 0.24, 1] as const;

function modeFor(path: string): SceneMode {
  if (path === '/') return 'home';
  if (path.startsWith('/contact')) return 'contact';
  return 'inner';
}

/** Keeps the outgoing page rendered while it animates out. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

export function Layout() {
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();
  const mode = modeFor(location.pathname);
  const quality = useMemo(detectQuality, []);

  // decide on WebGL once, start loading the 3D chunk during the preloader
  const ready = useMemo(() => {
    const ok = hasWebGL() && !prefersReducedMotion();
    uiStore.set({ webgl: ok ? 'on' : 'off' });
    return ok ? loadExperience() : Promise.resolve();
  }, []);

  useEffect(() => {
    sceneState.mode = mode;
    if (mode !== 'home') sceneState.chapter = 0;
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return (
    <>
      <BackgroundLayer quality={quality} mode={mode} />
      <Preloader ready={ready} />
      <Nav />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          scrollTo(0, true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }}
      >
        <motion.div key={location.pathname} className="page-wrap">
          <motion.div
            className="page-curtain"
            aria-hidden
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0, transition: { duration: 0.85, ease: EASE, delay: 0.05 } }}
            exit={{ scaleY: 1, originY: 1, transition: { duration: 0.6, ease: EASE } }}
          />
          <motion.main
            id="main"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            <FrozenOutlet />
          </motion.main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
