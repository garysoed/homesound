import UpdateLoop from './update-loop';

describe('utils.UpdateLoop', () => {
  let updateLoop;

  beforeEach(() => {
    updateLoop = new UpdateLoop();
    spyOn(window, 'requestAnimationFrame').and.returnValue();
    spyOn(updateLoop, 'update').and.returnValue();
  });

  describe('start', () => {
    it('should request animation frame and call update', () => {
      updateLoop.start();

      expect(requestAnimationFrame).toHaveBeenCalledWith(jasmine.any(Function));
      expect(updateLoop.update).toHaveBeenCalledWith();
    });

    it('should request animation frame when the caller to that function is called', () => {
      updateLoop.start();

      let callback = requestAnimationFrame.calls.argsFor(0)[0];
      requestAnimationFrame.calls.reset();
      updateLoop.update.calls.reset();
      callback();

      expect(requestAnimationFrame).toHaveBeenCalledWith(jasmine.any(Function));
      expect(updateLoop.update).toHaveBeenCalledWith();
    });
  });

  describe('stop', () => {
    it('should not request animation frame when its callback is called', () => {
      updateLoop.start();

      let callback = requestAnimationFrame.calls.argsFor(0)[0];
      requestAnimationFrame.calls.reset();
      updateLoop.update.calls.reset();

      updateLoop.stop();
      callback();

      expect(requestAnimationFrame).not.toHaveBeenCalled();
      expect(updateLoop.update).toHaveBeenCalledWith();
    });
  });
});
