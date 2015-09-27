import Updateable from './updateable';

describe('utils.Updateable', () => {
  const DATE = new Date(2013, 12, 4);
  const PERIOD = 10;

  let updateable;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(DATE);
    updateable = new Updateable(PERIOD);
  });

  describe('update', () => {
    beforeEach(() => {
      spyOn(updateable, 'updateInternal').and.returnValue();
    });

    it('should call updateInternal after the set period', () => {
      let elapsedTime = PERIOD + 1;
      jasmine.clock().tick(elapsedTime);
      updateable.update();

      expect(updateable.updateInternal).toHaveBeenCalledWith(elapsedTime);
      expect(getPrivateProperty(updateable, 'lastUpdate')).toEqual(DATE.getTime() + elapsedTime);
    });

    it('should not call updateInternal before the set period', () => {
      let elapsedTime = PERIOD - 1;
      jasmine.clock().tick(elapsedTime);
      updateable.update();

      expect(updateable.updateInternal).not.toHaveBeenCalled();
      expect(getPrivateProperty(updateable, 'lastUpdate')).toEqual(DATE.getTime());
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
