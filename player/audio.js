import Globals from './globals';
import ArrayCache from './utils/array-cache';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const __analyser__ = Symbol('analyser');
const __context__ = Symbol('context');
const __frequencyData__ = Symbol('frequencyData');
const __normalizedFrequencyData__ = Symbol('normalizedFrequencyData');
const __normalizedTimeDomainData__ = Symbol('normalizedTimeDomainData');
const __uri__ = Symbol('uri');
const __sourcePromise__ = Symbol('sourcePromise');
const __timeDomainData__ = Symbol('timeDomainData');
const __updateFrequencyData__ = Symbol('updateFrequencyData');
const __updateTimeDomainData__ = Symbol('updateTimeDomainData');

/**
 * Represents an audio source.
 *
 * @class Audio
 */
class Audio {

  /**
   * @param {string} uri URI to load the audio source.
   * @constructor
   */
  constructor(uri) {
    this[__uri__] = uri;
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
      request.open('GET', uri, true);
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

  /**
   * Updates the frequency data.
   *
   * @method __updateFrequencyData__
   * @param {Uint8Array} array The array to contain the updated frequency data.
   * @private
   */
  [__updateFrequencyData__](array) {
    this[__analyser__].getByteFrequencyData(this[__frequencyData__]);
    for (let i = 0; i < this[__frequencyData__].length; i++) {
      array[i] = this[__frequencyData__][i] / 256;
    }
  }

  /**
   * Updates the time domain data.
   *
   * @method __updateTimeDomainData__
   * @param {Uint8Array} array The array to contain the updated time domain data.
   * @private
   */
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

  /**
   * The normalized frequency data.
   *
   * @property frequencyData
   * @type Uint8Array
   * @readonly
   */
  get frequencyData() {
    return this[__normalizedFrequencyData__].get();
  }

  /**
   * The normalized time domain data.
   *
   * @property timeDomainData
   * @type Uint8Array
   * @readonly
   */
  get timeDomainData() {
    return this[__normalizedTimeDomainData__].get();
  }

  /**
   * The number of values in the frequency and time domain data array.
   *
   * @property dataCount
   * @type number
   * @readonly
   */
  get dataCount() {
    return this[__analyser__].frequencyBinCount;
  }
}

export default Audio;
