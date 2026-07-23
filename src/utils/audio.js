// Web Audio API & Web Speech Synthesis helper for Wedding Invitation

class SoundSystem {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isAudioStarted = false;
    this.bgMusicOscillators = [];
    this.isMuted = false;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isAudioStarted = true;
  }

  // Play luxury golden chime when envelope breaks
  playChime() {
    this.initAudio();
    if (!this.audioCtx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.3);
      }, idx * 120);
    });
  }

  // Play paper rustle sound effect
  playPaperRustle() {
    this.initAudio();
    if (!this.audioCtx || this.isMuted) return;

    const bufferSize = this.audioCtx.sampleRate * 0.4;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3, this.audioCtx.currentTime);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    whiteNoise.start();
  }

  // Voice Speech Greeting
  speakWelcome(groomName = "Saad") {
    if (!this.speechSynth || this.isMuted) return;
    
    // Cancel any ongoing speech
    this.speechSynth.cancel();

    const text = `Welcome to the wedding invitation of Subhana and ${groomName}! We are overjoyed to invite you to celebrate our special day with us.`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    // Try to find a warm natural voice if available
    const voices = this.speechSynth.getVoices();
    const englishVoice = voices.find(v => (v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female')))) || voices.find(v => v.lang.includes('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    this.speechSynth.speak(utterance);
  }

  // Soft Ambient Romantic Background Music Synthesizer
  startRomanticBGM() {
    this.initAudio();
    if (!this.audioCtx || this.isBgmPlaying) return;

    this.isBgmPlaying = true;
    
    // Gentle romantic arpeggio progression (C maj7 - Am7 - F maj7 - G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 349.23], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || this.isMuted || !this.audioCtx) return;

      const chord = chords[chordIndex];
      const freq = chord[noteIndex];

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, this.audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.85);

      noteIndex++;
      if (noteIndex >= chord.length) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    this.bgmTimer = setInterval(playNextNote, 400);
  }

  stopRomanticBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopRomanticBGM();
      if (this.speechSynth) this.speechSynth.cancel();
    } else {
      this.startRomanticBGM();
    }
    return this.isMuted;
  }
}

export const soundManager = new SoundSystem();
