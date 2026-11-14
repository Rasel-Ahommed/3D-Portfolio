import { uiStore, useUi } from '../../scenes/store';
import { setAmbient } from '../../utils/ambientSound';

export function SoundToggle() {
  const on = useUi((s) => s.sound);
  return (
    <button
      type="button"
      className={`sound-toggle ${on ? 'is-on' : ''}`}
      aria-pressed={on}
      aria-label={on ? 'Turn ambient sound off' : 'Turn ambient sound on'}
      onClick={() => {
        uiStore.set({ sound: !on });
        setAmbient(!on);
      }}
    >
      <span className="sound-toggle__bars" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <i key={i} style={{ animationDelay: `${i * 0.13}s` }} />
        ))}
      </span>
      <span className="sound-toggle__text">Sound {on ? 'on' : 'off'}</span>
    </button>
  );
}
