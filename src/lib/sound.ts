let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, duration: number, opts: { type?: OscillatorType; gain?: number; slideTo?: number } = {}) {
  const audio = getCtx();
  const osc = audio.createOscillator();
  const gainNode = audio.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  if (opts.slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(opts.slideTo, audio.currentTime + start + duration);
  }
  const peak = opts.gain ?? 0.25;
  gainNode.gain.setValueAtTime(0.0001, audio.currentTime + start);
  gainNode.gain.exponentialRampToValueAtTime(peak, audio.currentTime + start + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(gainNode);
  gainNode.connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.05);
}

function noiseBurst(start: number, duration: number, gain = 0.2) {
  const audio = getCtx();
  const bufferSize = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const gainNode = audio.createGain();
  gainNode.gain.setValueAtTime(gain, audio.currentTime + start);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + start + duration);
  src.connect(gainNode);
  gainNode.connect(audio.destination);
  src.start(audio.currentTime + start);
}

export function playCorrect() {
  tone(880, 0, 0.12, { type: 'sine', gain: 0.22 });
  tone(1318.5, 0.09, 0.18, { type: 'sine', gain: 0.22 });
}

export function playWrong() {
  tone(220, 0, 0.16, { type: 'sawtooth', gain: 0.18, slideTo: 140 });
  tone(160, 0.12, 0.18, { type: 'sawtooth', gain: 0.14, slideTo: 100 });
}

export function playLevelClear() {
  // クラッカー(ノイズバースト連発) + 拍手風(複数の短いノイズ) + 明るいアルペジオ
  noiseBurst(0, 0.25, 0.3);
  noiseBurst(0.03, 0.2, 0.22);
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => tone(f, 0.15 + i * 0.11, 0.22, { type: 'triangle', gain: 0.2 }));
  for (let i = 0; i < 10; i++) {
    noiseBurst(0.6 + i * 0.07, 0.06, 0.1);
  }
}
