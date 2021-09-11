import {Greeter} from '../index';

test('Greeter', () => {
  expect(Greeter('Robin')).toBe('Hello Robin');
});