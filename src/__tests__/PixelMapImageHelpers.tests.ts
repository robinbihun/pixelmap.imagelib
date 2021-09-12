import { PixelMapImageHelpers } from '../PixelMapImage';

test('IndexToRowColumn', () => {
  expect(PixelMapImageHelpers.toRowColumn(0)).toStrictEqual({ Row: 0, Column: 0 });
  expect(PixelMapImageHelpers.toRowColumn(15)).toStrictEqual({ Row: 0, Column: 15 });
  expect(PixelMapImageHelpers.toRowColumn(16)).toStrictEqual({ Row: 1, Column: 0 });
  expect(PixelMapImageHelpers.toRowColumn(153)).toStrictEqual({ Row: 9, Column: 9 });
  expect(PixelMapImageHelpers.toRowColumn(215)).toStrictEqual({ Row: 13, Column: 7 });
  expect(PixelMapImageHelpers.toRowColumn(255)).toStrictEqual({ Row: 15, Column: 15 });
});

test('RowColumnToIndex', () => {
  expect(PixelMapImageHelpers.toIndex({ Row: 0, Column: 0 })).toBe(0);
  expect(PixelMapImageHelpers.toIndex({ Row: 0, Column: 15 })).toBe(15);
  expect(PixelMapImageHelpers.toIndex({ Row: 1, Column: 0 })).toBe(16);
  expect(PixelMapImageHelpers.toIndex({ Row: 9, Column: 9 })).toBe(153);
  expect(PixelMapImageHelpers.toIndex({ Row: 13, Column: 7 })).toBe(215);
  expect(PixelMapImageHelpers.toIndex({ Row: 15, Column: 15 })).toBe(255);
});
