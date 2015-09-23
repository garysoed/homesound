import Audio from './audio';

describe('Audio', () => {
  const PATH = 'path.mp3';
  let audio;

  beforeEach(() => {
    audio = new Audio(PATH);
  });

  describe('constructor', () => {
    it('should request the given path', () => {
      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(PATH);
    });
  });

  describe('start', () => {
    it('should start the source after xhr response', () => {
      let context = getPrivateProperty(audio, 'context');
      spyOn(context, 'decodeAudioData').and.callFake((response, callback) => {
        callback(context.createBuffer(2, 22050, 44100));
      });

      let source = context.createBufferSource();
      spyOn(source, 'start').and.callThrough();
      spyOn(context, 'createBufferSource').and.returnValue(source);
      jasmine.Ajax.requests.mostRecent().respondWith({
        'status': 200,
        'contentType': 'audio/mpeg',
        'response': new ArrayBuffer(1)
      });
      return audio.start()
          .then(() => getPrivateProperty(audio, 'sourcePromise'))
          .then(source => {
            expect(source.start).toHaveBeenCalledWith(0.0);
          });
    });
  });

  describe('stop', () => {
    it('should stop the source after xhr response', () => {
      let context = getPrivateProperty(audio, 'context');
      spyOn(context, 'decodeAudioData').and.callFake((response, callback) => {
        callback(context.createBuffer(2, 22050, 44100));
      });

      let source = context.createBufferSource();
      spyOn(source, 'stop').and.callThrough();
      spyOn(context, 'createBufferSource').and.returnValue(source);
      jasmine.Ajax.requests.mostRecent().respondWith({
        'status': 200,
        'contentType': 'audio/mpeg',
        'response': new ArrayBuffer(1)
      });
      return audio.start()
          .then(() => audio.stop())
          .then(() => getPrivateProperty(audio, 'sourcePromise'))
          .then(source => {
            expect(source.stop).toHaveBeenCalledWith();
          });
    });
  });
});
// HTTP/1.1 200 OK
// server: ecstatic-0.7.6
// etag: "141439953-3393664-Sat Feb 04 2012 14:50:30 GMT-0800 (PST)"
// last-modified: Sat, 04 Feb 2012 22:50:30 GMT
// cache-control: max-age=3600
// content-length: 3393664
// content-type: audio/mpeg; charset=utf-8
// Date: Wed, 23 Sep 2015 06:22:25 GMT
// Connection: keep-alive
