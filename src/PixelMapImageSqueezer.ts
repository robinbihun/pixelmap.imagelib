import PixelMapImage from './PixelMapImage';

export default class PixelMapImageSqueezer {

  /**
   * This function will take a PixelMapImage and return a lossless compressed string representing the image
   *
   * @param image - The PixelMapImage to compress
   * @constructor
   */
  public static SqueezePixels(image: PixelMapImage): string {
    let encodedPixels = image.getEncodedPixels();
    let result: string = '';
    let count: number = 0;

    for (let i: number = 0; i < encodedPixels.length; i++) {
      let current = encodedPixels[i];
      let next = encodedPixels[i+1];

      if (count === 15){
        result += `${current}${count.toString(16)}`;
        count = 0;
      } else {
        if (current === next) {
          count++;
        } else {
          // output current
          result += `${current}${count.toString(16)}`;
          count = 0; // reset count
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
      let compressedPixel = compressedPixels.substr(i, 3);
      let multiplier = parseInt('0x' + compressedPixel.substr(2, 1), 16);

      for (let m = 0; m < multiplier + 1; m++) {
        pixels.push(compressedPixel.substr(0,2));
      }
    }

    return PixelMapImage.fromColorSpacePixels(pixels);
  }
}
