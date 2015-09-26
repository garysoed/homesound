import Effect from './effect';
import MovingEffect from './moving-effect';

describe('effect.MovingEffect', () => {
  const SPEED_X = 10;
  const SPEED_Y = 5;

  let effect;
  let movingEffect;

  beforeEach(() => {
    effect = jasmine.createSpyObj('effect', ['populateScene', 'update']);
    movingEffect = new MovingEffect(effect, SPEED_X, SPEED_Y);
  });

  describe('update', () => {
    it('should call update on the effect', () => {
      effect.update.and.stub();
      movingEffect.update();
      expect(effect.update).toHaveBeenCalledWith();
    });
  });

  describe('updateInternal', () => {
    it('should move the effect', () => {
      effect.x = 10;
      effect.y = 20;

      movingEffect.updateInternal(100);
      expect(effect.x).toEqual(10 + SPEED_X / 10);
      expect(effect.y).toEqual(20 + SPEED_Y / 10);
    });
  });

  describe('populateScene', () => {
    it('should call populateScene on the effect', () => {
      let scene = {};
      movingEffect.populateScene(scene);
      expect(effect.populateScene).toHaveBeenCalledWith(scene);
    });
  });

  describe('get x', () => {
    it('should get the X coordinate of the effect', () => {
      effect.x = 123;
      expect(movingEffect.x).toEqual(123);
    });
  });

  describe('set x', () => {
    it('should set the X coordinate of the effect', () => {
      movingEffect.x = 123;
      expect(effect.x).toEqual(123);
    });
  });

  describe('get y', () => {
    it('should get the Y coordinate of the effect', () => {
      effect.y = 123;
      expect(movingEffect.y).toEqual(123);
    });
  });

  describe('set y', () => {
    it('should set the Y coordinate of the effect', () => {
      movingEffect.y = 123;
      expect(effect.y).toEqual(123);
    });
  });

  describe('get visible', () => {
    it('should get visible from the effect', () => {
      effect.visible = true;
      expect(movingEffect.visible).toEqual(true);
    });
  });

  describe('set visible', () => {
    it('should set the visible of the effect', () => {
      movingEffect.visible = true;
      expect(effect.visible).toEqual(true);
    });
  });
});
