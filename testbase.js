function vector3Equal(first, second) {
  if (first instanceof THREE.Vector3 && second instanceof THREE.Vector3) {
    return first.x === second.x
        && first.y === second.y
        && first.z === second.z;
  }
}

function getSymbol(obj, name) {
  return Object.getOwnPropertySymbols(obj).find(symbol => {
    return `Symbol(${name})` === symbol.toString();
  });
}

function getPrivateProperty(obj, name) {
  return obj[getSymbol(obj, name)];
}

var jasmineEnv = jasmine.getEnv();

window.it = function(description, runner, timeout) {
  if (!runner || runner.length > 0) {
    jasmineEnv.it(description, runner, timeout);
    return;
  }

  jasmineEnv.it(description, function(done) {
    var rv = runner();
    if (rv instanceof Promise) {
      rv
          .then(done)
          .catch(done.fail);
    } else {
      done();
    }
  }, timeout);
};

window.fit = function(description, runner, timeout) {
  if (runner.length > 0) {
    jasmineEnv.fit(description, runner, timeout);
  } else {
    jasmineEnv.fit(description, function(done) {
      var rv = runner();
      if (rv instanceof Promise) {
        rv
            .then(done)
            .catch(done.fail);
      } else {
        done();
      }
    }, timeout);
  }
};

window.beforeEach = function(runner, timeout) {
  if (runner.length > 0) {
    jasmineEnv.beforeEach(runner, timeout);
  } else {
    jasmineEnv.beforeEach(function(done) {
      var rv = runner();
      if (rv instanceof Promise) {
        rv
            .then(done)
            .catch(done.fail);
      } else {
        done();
      }
    }, timeout);
  }
};

beforeEach(function() {
  jasmine.addCustomEqualityTester(vector3Equal)
  jasmine.Ajax.install();
});

afterEach(function() {
  jasmine.Ajax.uninstall();
});
