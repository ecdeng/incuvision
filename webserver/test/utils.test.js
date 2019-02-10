const isValidPointStr = require('../utils.js')

test('tests if the string "(10, 10)" is a point', () => {
    expect(isValidPointStr('(10, 10)')).toBe(true);
});