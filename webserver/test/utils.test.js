const isValidPointStr = require('../src/utils.js').isValidPointStr;
const moveStrToTuple = require('../src/utils.js').moveStrToTuple;

test('tests if the string "(10, 10)" is a point', () => {
    expect(isValidPointStr('(10, 10)')).toBe(true);
});

test('tests if the string "(200, -50)" is a point', () => {
    expect(isValidPointStr('(200, -50)')).toBe(true);
});

test('tests if the string "(10, x)" is not a point', () => {
    expect(isValidPointStr('(10, x)')).toBe(false);
});

test('tests if the string "(x, 10)" is not a point', () => {
    expect(isValidPointStr('(x, 10)')).toBe(false);
});

test('tests if the string "(f, f)" is not a point', () => {
    expect(isValidPointStr('(f, f)')).toBe(false);
});

test('tests if the string "fdjksjfk" is not a point', () => {
    expect(isValidPointStr('fdjksjfk')).toBe(false);
});

test('tests if the empty string is not a point', () => {
    expect(isValidPointStr('')).toBe(false);
});

test('tests if the string "(1000000000000000, 1000000000000000)" is not a point', () => {
    expect(isValidPointStr('(1000000000000000, 1000000000000000)')).toBe(false);
});

test('tests if the string "(1.1, 1.1)" is a point', () => {
    expect(isValidPointStr('(1.1, 1.1)')).toBe(true);
});

test('tests if the string "d10, 3f" is not a point', () => {
    expect(isValidPointStr('d10, 3f')).toBe(false);
});

test('tests that the move (1, 2) is converted to the correct tuple', () => {
    expect(moveStrToTuple('(1, 2)')).toBe((1, 2));
});

test('tests that the move (-3, 5) is converted to the correct tuple', () => {
    expect(moveStrToTuple('(-3, 5)')).toBe((-3, 5));
});

test('tests that the move (3,2) is converted to the correct tuple', () => {
    expect(moveStrToTuple('(3,2)')).toBe((3, 2));
});

test('tests that the move    (3, 2) is converted to the correct tuple (including whitespace)', () => {
    expect(moveStrToTuple('  (3, 2)')).toBe((3, 2));
});