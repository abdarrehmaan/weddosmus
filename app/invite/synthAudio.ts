// Web Audio API Synthesizer for Duff & Oud traditional wedding music + Festive Chimes + Wax seal sound effect
// 100% Zero-dependency, runs purely in modern browsers

export type AudioThemeMode = "wedding" | "festival" | "spiritual";

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private duffInterval: any = null;
  private melodyInterval: any = null;
  private droneInterval: any = null;
  private playing: boolean = false;
  private currentMode: AudioThemeMode = "wedding";
  private nasheedAudio: HTMLAudioElement | null = null;

  private initNasheedAudio() {
    if (!this.nasheedAudio && typeof window !== "undefined" && typeof Audio !== "undefined") {
      this.nasheedAudio = new Audio("/audio/wedding-nasheed-muhammad-al-muqit.mp3");
      this.nasheedAudio.loop = true;
      this.nasheedAudio.preload = "auto";
      this.nasheedAudio.volume = 0.8;
    }
    return this.nasheedAudio;
  }

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

  // Pure Celestial Chime for Eid & Festivals
  private playFestiveChime(freq: number, duration: number = 1.6) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    // Warm overtone
    const overtone = this.ctx.createOscillator();
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(freq * 2.76, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const overGain = this.ctx.createGain();
    overGain.gain.setValueAtTime(0.035, t);
    overGain.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.5);

    osc.connect(gain).connect(this.ctx.destination);
    overtone.connect(overGain).connect(this.ctx.destination);

    osc.start(t);
    overtone.start(t);
    osc.stop(t + duration);
    overtone.stop(t + duration);
  }

  // Ambient Serene Swell for Ramadan / Spiritual Cards
  private playSpiritualSwell(freq: number) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.045, t + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 3.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.linearRampToValueAtTime(900, t + 1.5);
    filter.frequency.linearRampToValueAtTime(400, t + 3.8);

    osc.connect(gain).connect(filter).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 4.0);
  }

  start(mode: AudioThemeMode = "wedding") {
    this.initContext();
    if (this.playing) {
      this.stop();
    }
    this.playing = true;
    this.currentMode = mode;

    if (mode === "wedding") {
      // Default: Authentic Wedding Nasheed by Muhammad Al Muqit
      const audio = this.initNasheedAudio();
      if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.playing = true;
            })
            .catch((err) => {
              console.log("Audio play blocked by browser policy, using synth fallback:", err);
              this.startSynthWedding();
            });
          return;
        }
      }
      this.startSynthWedding();
    } else if (mode === "festival") {
      // Radiant Eid Takbeerat Festive Chime Arpeggio (C Major / Lydian pentatonic bells)
      const chimes = [523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 523.25];
      let chimeStep = 0;

      this.melodyInterval = setInterval(() => {
        const freq = chimes[chimeStep % chimes.length];
        this.playFestiveChime(freq, 2.0);
        chimeStep++;
      }, 750);
    } else if (mode === "spiritual") {
      // Deep soothing meditative drone for Ramadan & Quran cards (D2, A2, D3, F#3)
      const droneNotes = [146.83, 220.0, 293.66, 369.99];
      let droneStep = 0;

      this.droneInterval = setInterval(() => {
        const freq = droneNotes[droneStep % droneNotes.length];
        this.playSpiritualSwell(freq);
        droneStep++;
      }, 2200);
    }
  }

  private startSynthWedding() {
    // Traditional 6/8 Duff rhythm fallback
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
    const oudMelody = [
      293.66, 311.13, 369.99, 392.0, 440.0, 392.0, 369.99, 311.13,
      293.66, 0, 369.99, 392.0, 440.0, 466.16, 440.0, 392.0,
      369.99, 311.13, 293.66, 0,
    ];
    let oudStep = 0;

    this.melodyInterval = setInterval(() => {
      const note = oudMelody[oudStep % oudMelody.length];
      if (note > 0) {
        this.playOudNote(note, 0.7);
      }
      oudStep++;
    }, eighth * 2000);
  }

  stop() {
    this.playing = false;
    if (this.nasheedAudio) {
      this.nasheedAudio.pause();
    }
    if (this.duffInterval) {
      clearInterval(this.duffInterval);
      this.duffInterval = null;
    }
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.droneInterval) {
      clearInterval(this.droneInterval);
      this.droneInterval = null;
    }
  }

  toggle(mode?: AudioThemeMode): boolean {
    if (this.playing) {
      this.stop();
      return false;
    } else {
      this.start(mode || this.currentMode);
      return true;
    }
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getMode(): AudioThemeMode {
    return this.currentMode;
  }
}

export const weddingAudio = new WeddingAudioEngine();
