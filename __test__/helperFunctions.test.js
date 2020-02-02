const { getTargetScore } = require('../lib/helperFunctions');

describe('Helper functions', () =>{
  it('has an operational function for getting the Target Score', () => {
    for(let i = 0; i < 16; i++) {
      expect(getTargetScore('easy', [0, 0, 0])).toBe(0);
    }
    expect(getTargetScore('medium', [1, 1, 0])).toBe(1);
    expect(getTargetScore('hard', [15, 0, -13])).toBe(15);
  });
});
