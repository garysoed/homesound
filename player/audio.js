import Globals from './globals';
import ArrayCache from './arraycache';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const __analyser__ = Symbol('analyser');
const __context__ = Symbol('context');
const __frequencyData__ = Symbol('frequencyData');
const __normalizedFrequencyData__ = Symbol('normalizedFrequencyData');
const __normalizedTimeDomainData__ = Symbol('normalizedTimeDomainData');
const __path__ = Symbol('path');
const __sourcePromise__ = Symbol('sourcePromise');
const __timeDomainData__ = Symbol('timeDomainData');
const __updateFrequencyData__ = Symbol('updateFrequencyData');
const __updateTimeDomainData__ = Symbol('updateTimeDomainData');

class Audio {
  constructor(path) {
    this[__path__] = path;
    this[__context__] = new AudioContext();
    this[__analyser__] = this[__context__].createAnalyser();
    this[__analyser__].smoothingTimeConstant = 0.75;
    this[__analyser__].fftSize = Globals.SAMPLE_POINTS * 2;

    this[__frequencyData__] = new Uint8Array(this[__analyser__].frequencyBinCount);
    this[__timeDomainData__] = new Uint8Array(this[__analyser__].frequencyBinCount);
    this[__normalizedFrequencyData__] = new ArrayCache(this[__updateFrequencyData__].bind(this));
    this[__normalizedTimeDomainData__] = new ArrayCache(this[__updateTimeDomainData__].bind(this));

    this[__sourcePromise__] = new Promise(resolve => {
      let request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.responseType = 'arraybuffer';
      request.addEventListener('load', () => {
        this[__context__].decodeAudioData(request.response, buffer => {
          // Start the sound
          let source = this[__context__].createBufferSource();
          source.connect(this[__context__].destination);
          source.connect(this[__analyser__]);
          source.playbackRate.value = 1;
          source.buffer = buffer;
          source.loop = false;
          resolve(source);
        });
      });
      request.send();
    });
  }

  [__updateFrequencyData__](array) {
    this[__analyser__].getByteFrequencyData(this[__frequencyData__]);
    for (let i = 0; i < this[__frequencyData__].length; i++) {
      array[i] = this[__frequencyData__][i] / 256;
    }
  }

  [__updateTimeDomainData__](array) {
    this[__analyser__].getByteTimeDomainData(this[__timeDomainData__]);
    for (let i = 0; i < this[__timeDomainData__].length; i++) {
      array[i] = (this[__timeDomainData__][i] - 128) / 128;
    }
  }

  /**
   * Starts the Audio to play.
   *
   * @method start
   * @return {Promise} Promise that will be resolved when the audio has been started.
   */
  start() {
    return this[__sourcePromise__].then(source => {
      source.start(0.0);
    });
  }

  /**
   * Stops the Audio from playing.
   *
   * @method stop
   * @return {Promise} Promise that will be resolved when the audio has stopped.
   */
  stop() {
    return this[__sourcePromise__].then(source => {
      source.stop();
    });
  }

  /**
   * Called to update the audio.
   */
  update() {
    this[__normalizedFrequencyData__].clear();
    this[__normalizedTimeDomainData__].clear();
  }

  get frequencyData() {
    return this[__normalizedFrequencyData__].get();
  }

  get timeDomainData() {
    return this[__normalizedTimeDomainData__].get();
  }

  get valuesCount() {
    return this[__analyser__].frequencyBinCount;
  }
}

export default Audio;
