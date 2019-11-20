const { hello } = require('../index');

describe('Main Module', () => {
  it('passes a basic test', () => {

    expect(hello()).toBe('Hello World');
  });
});
