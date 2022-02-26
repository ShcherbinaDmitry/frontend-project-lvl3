import app from '../src/app.js';

beforeEach(() => {
  app();
});

test('app', () => {
  expect(true).toBeTruthy();
});
