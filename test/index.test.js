const read = require('../lib/read');

test('should return nothing', () => {
  expect(read('.js', 'D:\\Projects\\JavaScriptProjects\\rl-directory')).toBe(undefined);
});