import ArrayCache from './arraycache';

describe('ArrayCache', () => {
  let getFn;
  let cache;

  beforeEach(() => {
    getFn = jasmine.createSpy('getFn');
    cache = new ArrayCache(getFn);
  });

  describe('get', () => {
    it('should return the value provided by the get function', () => {
      getFn.and.callFake(array => {
        array[0] = 1;
        array[1] = 3;
      });
      expect(cache.get()).toEqual([1, 3]);
      expect(getFn).toHaveBeenCalledWith(jasmine.any(Array));
    });

    it('should only call the get function once after multiple calls', () => {
      getFn.and.callFake(array => {
        array[0] = 1;
      });

      cache.get();
      cache.get();
      expect(getFn.calls.count()).toEqual(1);
    });
  });

  describe('clear', () => {
    it('should call the get function after clearing', () => {
      getFn.and.callFake(array => {
        array[0] = 1;
      });

      cache.get();
      cache.clear();

      getFn.calls.reset();
      cache.get();
      expect(getFn).toHaveBeenCalledWith(jasmine.any(Array));
    });
  });
});
