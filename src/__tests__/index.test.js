import app from '../app.js';

beforeEach(() => {
  app();
});

test('app', () => {
  expect(true).toBeTruthy();
});
