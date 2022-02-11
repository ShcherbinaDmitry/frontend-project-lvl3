import { promises as fs } from 'fs';
import path from 'path';
import app from '../src/app.js';

beforeEach(() => {
  const pathToHtml = path.resolve(__dirname, '__fixtures__', 'index.html');
  console.log(pathToHtml);
});

test('app', () => {
  app();
  expect(true).toBe(true);
});
