import path from 'path';

beforeEach(() => {
  const pathToHtml = path.resolve(__dirname, '__fixtures__', 'index.html');
  console.log(pathToHtml);
});

test('app', () => {
  expect(true).toBe(true);
});
