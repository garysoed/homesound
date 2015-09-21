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

beforeEach(function() {
  jasmine.addCustomEqualityTester(vector3Equal)
});
