let audioEl: HTMLAudioElement | null = null;

function getAudio() {
  if (typeof window === 'undefined') return null;
  if (!audioEl) {
    audioEl = new Audio('/sounds/writing.mp3');
    audioEl.loop = true;
    audioEl.preload = 'auto';
    audioEl.volume = 0.7;
    audioEl.crossOrigin = 'anonymous';
  }
  return audioEl;
}

export function unlockAudio() {
  const audio = getAudio();
  if (!audio) return;
  // Attempt to unlock audio context on first user gesture
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
  }).catch(() => {});
}

export function playWritingSound() {
  const audio = getAudio();
  if (!audio) return;
  audio.play().catch(() => {
    // If autoplay is blocked, try again on next gesture
  });
}

export function stopWritingSound() {
  const audio = getAudio();
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}
