import PixelMapImage from './PixelMapImage';

export default class PixelMapImageSqueezer {
  /**
   * This function will take a PixelMapImage and return a lossless compressed string representing the image
   *
   * @param image - The PixelMapImage to compress
   * @constructor
   */
  public static SqueezePixels(image: PixelMapImage): string {
    let result: string = '';
    let current: string = '';
    let count = 0;

    for (let i: number = 0; i < image.getEncodedPixels().length; i++) {
      current = image.getEncodedPixels()[i];
      // Last Item, do not look ahead
      if (i == image.getEncodedPixels().length - 1) {
        result += `${current}${count.toString(16)}`;
      } else {
        if (current === image.getEncodedPixels()[i + 1]) {
          // limit count to 16 (F) for easier parsing
          if (count === 16) {
            result += `${current}${count.toString(16)}`;
            count = 0;
          }

          count += 1;
        } else {
          result += `${current}${count.toString(16)}`;
          count = 0;
        }
      }
    }

    return result;
  }

  /**
   * This function will take a lossless compressed image string and return a valid PixelMapImage
   *
   * @param compressedPixels - The compressed image string
   * @constructor
   */
  public static UnSqueezePixels(compressedPixels: string): PixelMapImage {
    let pixels: string[] = [];

    for (let i = 0; i + 3 <= compressedPixels.length; i += 3) {
      let compressedPixel = compressedPixels.substr(i, 2);
      let multiplier = parseInt('0x' + compressedPixels.substr(i + 2, 1), 16);

      for (let m = 0; m <= multiplier; m++) {
        pixels.push(compressedPixel);
      }
    }

    return PixelMapImage.fromColorSpacePixels(pixels);
  }
}
