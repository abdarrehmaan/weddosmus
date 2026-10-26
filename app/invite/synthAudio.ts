// Web Audio API Synthesizer for Duff & Oud traditional wedding music + Wax seal sound effect
// 100% Zero-dependency, runs purely in modern browsers

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private duffInterval: any = null;
  private oudInterval: any = null;
  private playing: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Wax seal tap sound effect
  playSealBreak() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // Soft crisp "pop / chime"
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.28);
    } catch {
      // Audio might be blocked by user gesture policy
    }
  }

  // Duff frame drum beat hit
  private playDuffHit(accent: boolean) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const vol = accent ? 0.28 : 0.14;
    const freq = accent ? 85 : 120;

    // Noise component
    const bufSize = Math.floor(this.ctx.sampleRate * 0.08);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = accent ? 400 : 750;
    noiseFilter.Q.value = 0.8;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.35, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    noise.connect(noiseFilter).connect(noiseGain).connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.1);

    // Sine tone for resonant low drum body
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.22);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(vol, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

    osc.connect(oscGain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Melodic Oud pluck note
  private playOudNote(freq: number, duration: number = 0.85) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.value = freq;

    const osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2.01;

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.08, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + duration);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.03, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.6);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(450, t + duration);
    filter.Q.value = 1.2;

    osc1.connect(gain1).connect(filter);
    osc2.connect(gain2).connect(filter);
    filter.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  start() {
    this.initContext();
    if (!this.ctx) return;
    if (this.playing) return;
    this.playing = true;

    // Traditional 6/8 Duff rhythm
    const bpm = 76;
    const eighth = 60 / bpm / 2;
    let step = 0;
    const duffPattern = [1, 0, 0, 0.5, 0, 0, 1, 0, 0, 0.5, 0, 0];

    this.duffInterval = setInterval(() => {
      const hit = duffPattern[step % duffPattern.length];
      if (hit > 0) {
        this.playDuffHit(hit >= 1);
      }
      step++;
    }, eighth * 1000);

    // Gentle Hijaz / Bayati maqam melody notes (Hz)
    // D4, Eb4, F#4, G4, A4, Bb4, C5, D5
    const oudMelody = [
      293.66, 311.13, 369.99, 392.0, 440.0, 392.0, 369.99, 311.13,
      293.66, 0, 369.99, 392.0, 440.0, 466.16, 440.0, 392.0,
      369.99, 311.13, 293.66, 0,
    ];
    let oudStep = 0;

    this.oudInterval = setInterval(() => {
      const note = oudMelody[oudStep % oudMelody.length];
      if (note > 0) {
        this.playOudNote(note, 0.7);
      }
      oudStep++;
    }, eighth * 2000);
  }

  stop() {
    this.playing = false;
    if (this.duffInterval) {
      clearInterval(this.duffInterval);
      this.duffInterval = null;
    }
    if (this.oudInterval) {
      clearInterval(this.oudInterval);
      this.oudInterval = null;
    }
  }

  toggle(): boolean {
    if (this.playing) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  isPlaying(): boolean {
    return this.playing;
  }
}

export const weddingAudio = new WeddingAudioEngine();
