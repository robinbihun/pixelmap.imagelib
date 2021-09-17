import PixelMapImage from '../PixelMapImage';
import PixelMapImageSqueezer from '../PixelMapImageSqueezer';

// TODO: wait for more test cases...
// In theory, we should see an improvement most of the time, only images with every other pixel changing color should result in equal length to the legacy storage.
test('Can squeeze and un-squeeze pixels :-)', () => {
  let legacyData =
    '390390390390390390390000000390390390390390390390390390390390390390000FF0FF0000390390390390390390390390390390390390000FF0FF0000390390390390390390390390390390390000FF0FF0FF0F' +
    'F0000390390390390390000000000000000000FF0FF0FF0FF0000000000000000000000FF0FF0FF0FF0FF0FF0FF0FF0FF0FF0FF0FF0FF0FF0000390000FF0FF0FF0FF0000FF0FF0000FF0FF0FF0FF000039039039000' +
    '0FF0FF0FF0000FF0FF0000FF0FF0FF0000390390390390390000FF0FF0000FF0FF0000FF0FF0000390390390390390390000FF0FF0FF0FF0FF0FF0FF0FF0000390390390390390000FF0FF0FF0FF0FF0FF0FF0FF0FF0' +
    'FF0000390390390390000FF0FF0FF0FF0FF0FF0FF0FF0FF0FF0000390390390000FF0FF0FF0FF0FF0000000FF0FF0FF0FF0FF0000390390000FF0FF0FF0000000390390000000FF0FF0FF0000390000FF0FF00000003' +
    '90390390390390390000000FF0FF0000000000000390390390390390390390390390390000000000';

  let pixelMapImage = PixelMapImage.fromLegacyImageData(legacyData);
  let squeezed = PixelMapImageSqueezer.SqueezePixels(pixelMapImage);

  expect(squeezed.length).toEqual(240);
  expect(squeezed.length).toBeLessThanOrEqual(legacyData.length);

  expect(squeezed).toBe('36600136c000d2100036b000d2100036a000d23000364005d23006d2d000360000d23000d21000d23000362000d22000d21000d22000364000d21000d21000d21000365000d27000364000d29000363000d29000362000d24001d24000361000d22001361001d22000360000d21001365001d21003369002')

  let unSqueezed = PixelMapImageSqueezer.UnSqueezePixels(squeezed);
  expect(unSqueezed.toString()).toEqual(pixelMapImage.toString());
});

test('Squeeze and un-squeeze all same color image :-)', () => {
  let legacyData =
    '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' +
    '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' +
    '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' +
    '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' +
    '000000000000000000000000000000000000000000000000';

  let pixelMapImage = PixelMapImage.fromLegacyImageData(legacyData);
  let squeezed = PixelMapImageSqueezer.SqueezePixels(pixelMapImage);

  expect(squeezed.length).toEqual(48);
  expect(squeezed.length).toBeLessThanOrEqual(legacyData.length);

  expect(squeezed).toBe('00f00f00f00f00f00f00f00f00f00f00f00f00f00f00f00f')

  let unSqueezed = PixelMapImageSqueezer.UnSqueezePixels(squeezed);
  expect(unSqueezed.toString()).toEqual(pixelMapImage.toString());
});