// Procedural Audio Synthesizer for Toddler Sensory Experience
// Zero latency, no network downloads required, always harmonious!

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private hapticEnabled: boolean = true;

  // Major Pentatonic Scale (C4 to E5): Pure harmony, zero dissonance
  private pentatonicFrequencies = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99  // G5
  ];

  private currentNoteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setHapticEnabled(enabled: boolean) {
    this.hapticEnabled = enabled;
  }

  public triggerHaptic(duration: number | number[] = 20) {
    if (!this.hapticEnabled) return;
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(duration as VibratePattern);
      }
    } catch {
      // Ignore vibration errors if unsupported
    }
  }

  // Realistic Bubble / Wooden Pop
  public playBubblePop() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.triggerHaptic(25);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Random pitch variation around pleasant range
    const baseFreq = 400 + Math.random() * 300;
    osc.type = 'sine';

    // Fast pitch sweep up then down (bubble pop signature)
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.09);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Kalimba / Wooden Xylophone Bell Note (Pentatonic Harmony)
  public playPentatonicChime(step?: number) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.triggerHaptic(15);

    const index = step !== undefined 
      ? step % this.pentatonicFrequencies.length 
      : this.currentNoteIndex;

    const freq = this.pentatonicFrequencies[index];
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.pentatonicFrequencies.length;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle'; // warm, gentle harmonic
    osc.frequency.setValueAtTime(freq, now);

    // Warm decay envelope
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  // Cartoon Elastic Spring / Boing (for dragging shapes)
  public playBoing() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.triggerHaptic(20);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Celebratory Multi-Tone Arpeggio for Success
  public playCelebration() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.triggerHaptic([30, 50, 30, 50, 60]);

    const chord = [329.63, 392.00, 523.25, 659.25]; // E4, G4, C5, E5
    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + (idx * 0.12);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  // Friendly soft UI tap
  public playTap() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.triggerHaptic(10);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const sound = new SoundManager();
