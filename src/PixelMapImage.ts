const IMAGE_SIZE: number = 16;
/**
 * The color space to allow us up to encode 256 colors, though currently only 216 are in use for "web-safe colors"
 */
const IMAGE_COLOR_SPACE: string[] = [
  '#000000',
  '#000033',
  '#000066',
  '#000099',
  '#0000CC',
  '#0000FF',
  '#003300',
  '#003333',
  '#003366',
  '#003399',
  '#0033CC',
  '#0033FF',
  '#006600',
  '#006633',
  '#006666',
  '#006699',
  '#0066CC',
  '#0066FF',
  '#009900',
  '#009933',
  '#009966',
  '#009999',
  '#0099CC',
  '#0099FF',
  '#00CC00',
  '#00CC33',
  '#00CC66',
  '#00CC99',
  '#00CCCC',
  '#00CCFF',
  '#00FF00',
  '#00FF33',
  '#00FF66',
  '#00FF99',
  '#00FFCC',
  '#00FFFF',
  '#330000',
  '#330033',
  '#330066',
  '#330099',
  '#3300CC',
  '#3300FF',
  '#333300',
  '#333333',
  '#333366',
  '#333399',
  '#3333CC',
  '#3333FF',
  '#336600',
  '#336633',
  '#336666',
  '#336699',
  '#3366CC',
  '#3366FF',
  '#339900',
  '#339933',
  '#339966',
  '#339999',
  '#3399CC',
  '#3399FF',
  '#33CC00',
  '#33CC33',
  '#33CC66',
  '#33CC99',
  '#33CCCC',
  '#33CCFF',
  '#33FF00',
  '#33FF33',
  '#33FF66',
  '#33FF99',
  '#33FFCC',
  '#33FFFF',
  '#660000',
  '#660033',
  '#660066',
  '#660099',
  '#6600CC',
  '#6600FF',
  '#663300',
  '#663333',
  '#663366',
  '#663399',
  '#6633CC',
  '#6633FF',
  '#666600',
  '#666633',
  '#666666',
  '#666699',
  '#6666CC',
  '#6666FF',
  '#669900',
  '#669933',
  '#669966',
  '#669999',
  '#6699CC',
  '#6699FF',
  '#66CC00',
  '#66CC33',
  '#66CC66',
  '#66CC99',
  '#66CCCC',
  '#66CCFF',
  '#66FF00',
  '#66FF33',
  '#66FF66',
  '#66FF99',
  '#66FFCC',
  '#66FFFF',
  '#990000',
  '#990033',
  '#990066',
  '#990099',
  '#9900CC',
  '#9900FF',
  '#993300',
  '#993333',
  '#993366',
  '#993399',
  '#9933CC',
  '#9933FF',
  '#996600',
  '#996633',
  '#996666',
  '#996699',
  '#9966CC',
  '#9966FF',
  '#999900',
  '#999933',
  '#999966',
  '#999999',
  '#9999CC',
  '#9999FF',
  '#99CC00',
  '#99CC33',
  '#99CC66',
  '#99CC99',
  '#99CCCC',
  '#99CCFF',
  '#99FF00',
  '#99FF33',
  '#99FF66',
  '#99FF99',
  '#99FFCC',
  '#99FFFF',
  '#CC0000',
  '#CC0033',
  '#CC0066',
  '#CC0099',
  '#CC00CC',
  '#CC00FF',
  '#CC3300',
  '#CC3333',
  '#CC3366',
  '#CC3399',
  '#CC33CC',
  '#CC33FF',
  '#CC6600',
  '#CC6633',
  '#CC6666',
  '#CC6699',
  '#CC66CC',
  '#CC66FF',
  '#CC9900',
  '#CC9933',
  '#CC9966',
  '#CC9999',
  '#CC99CC',
  '#CC99FF',
  '#CCCC00',
  '#CCCC33',
  '#CCCC66',
  '#CCCC99',
  '#CCCCCC',
  '#CCCCFF',
  '#CCFF00',
  '#CCFF33',
  '#CCFF66',
  '#CCFF99',
  '#CCFFCC',
  '#CCFFFF',
  '#FF0000',
  '#FF0033',
  '#FF0066',
  '#FF0099',
  '#FF00CC',
  '#FF00FF',
  '#FF3300',
  '#FF3333',
  '#FF3366',
  '#FF3399',
  '#FF33CC',
  '#FF33FF',
  '#FF6600',
  '#FF6633',
  '#FF6666',
  '#FF6699',
  '#FF66CC',
  '#FF66FF',
  '#FF9900',
  '#FF9933',
  '#FF9966',
  '#FF9999',
  '#FF99CC',
  '#FF99FF',
  '#FFCC00',
  '#FFCC33',
  '#FFCC66',
  '#FFCC99',
  '#FFCCCC',
  '#FFCCFF',
  '#FFFF00',
  '#FFFF33',
  '#FFFF66',
  '#FFFF99',
  '#FFFFCC',
  '#FFFFFF',
];

/**
 * A simple structure to pass Row and Column information
 */
interface RowColumn {
  Row: number;
  Column: number;
}

export default class PixelMapImage {
  private readonly pixel_data: string[];

  /**
   * This constructs a new PixelMapImage object using 256 pixel color values (full hex code e.g. #003399)
   *
   * @param data - The Raw Pixel Data, expects a 256 length string array of web safe hex color codes (e.g. #003399)
   */
  constructor(colors: string[]) {
    let totalLength = IMAGE_SIZE * IMAGE_SIZE;
    if (colors.length != totalLength) {
      throw new Error(
        `Invalid Pixel Data Size, must be ${IMAGE_SIZE}x${IMAGE_SIZE} pixels for a length of ${totalLength}`,
      );
    }

    let pixels: string[] = [];
    colors.forEach((colorString) => {
      let colorSpaceValue = PixelMapImageHelpers.getColorSpaceValue(colorString);
      pixels.push(colorSpaceValue);
    })

    this.pixel_data = pixels;
  }

  /**
   * This function will take a legacy string image and convert it to our color space and return a new PixelMapImage to work with.
   *
   * @param imageData - This is the legacy string image data, expected to be 768 characters in length.
   */
  public static fromLegacyImageData(imageData: string): PixelMapImage {
    if (imageData.length != 768) {
      throw new Error('Invalid legacy image data');
    }

    let pixels: string[] = [];

    for (let p = 0; p < 256; p++) {
      let pixel = imageData.substr(p * 3, 3);
      let colorString = `#${pixel[0]}${pixel[0]}${pixel[1]}${pixel[1]}${pixel[2]}${pixel[2]}`;
      pixels.push(colorString);
    }

    return new PixelMapImage(pixels);
  }

  // HACK: converting color space pixels to colors to ultimately let the constructor convert back to color space pixels
  public static fromColorSpacePixels(imageData: string[]): PixelMapImage {
    let colors: string[] = [];
    imageData.forEach((pixel, idx) => {
      let rowCol = {Row: parseInt(pixel[0], 16), Column: parseInt(pixel[1], 16)}
      let colorSpaceIndex = PixelMapImageHelpers.toIndex(rowCol);
      colors.push(IMAGE_COLOR_SPACE[colorSpaceIndex]);
    })

    return new PixelMapImage(colors);
  }

  // TODO: function to return pixels as colors
  // TODO: function to return pixel as color by index
  // TODO: function to return pixel as color by row/col

  /**
   * This function returns the raw pixels for the image in our color space
   */
  public getEncodedPixels(): string[] {
    return this.pixel_data;
  }

  /**
   * This function will return a single pixel in our color space for the specified row (0-15) and column (0-15)
   *
   * @param rowCol - The Row and Column of the pixel in a grid where (0,0) is top left
   */
  public getEncodedPixelByRowAndColumn(rowCol: RowColumn): string {
    if (rowCol.Row < 0 || rowCol.Row >= IMAGE_SIZE) {
      throw new Error(`Invalid Row.`);
    }

    if (rowCol.Column < 0 || rowCol.Column >= IMAGE_SIZE) {
      throw new Error(`Invalid Column.`);
    }

    let index = PixelMapImageHelpers.toIndex(rowCol);
    return this.getEncodedPixelByIndex(index);
  }

  /**
   * This function will return a single pixel in our color space for the specified index (0-255)
   *
   * @param index - The index of the pixel to return
   */
  public getEncodedPixelByIndex(index: number): string {
    if (index > IMAGE_SIZE * IMAGE_SIZE - 1 || index < 0) {
      throw new Error(`Invalid pixel index.`);
    }

    return this.pixel_data[index];
  }

  /**
   * This function will return the size of the square image (currently, always '16')
   */
  public getSize(): number {
    return Math.sqrt(this.pixel_data.length);
  }

  public toString(): string {
    return this.pixel_data.join('');
  }
}

export class PixelMapImageHelpers {
  /**
   * A Helper function to convert a single-dimensional array index into a Row and Column
   *
   * @param index - The index to convert into a Row and Column
   * @constructor
   */
  public static toRowColumn(index: number): RowColumn {
    let row = Math.floor(index / IMAGE_SIZE);
    let col = index - row * IMAGE_SIZE;

    return { Row: row, Column: col };
  }

  /**
   * A Helper function to convert a Row and Column into a single-dimensional array index
   * @param rowCol
   * @constructor
   */
  public static toIndex(rowCol: RowColumn): number {
    return rowCol.Row * IMAGE_SIZE + rowCol.Column;
  }

  /**
   * A Helper function to get the color space value of a supported hex color code.
   *
   * @param hexColor - The hex color code to convert to pixelmap color space (e.g. #003399)
   */
  public static getColorSpaceValue(hexColor: string) : string {
    let colorSpaceIndex = IMAGE_COLOR_SPACE.indexOf(hexColor);
    if (colorSpaceIndex === -1) {
      throw new Error('Image data contains invalid color, not in web safe color space');
    }
    let colorSpaceRowCol = PixelMapImageHelpers.toRowColumn(colorSpaceIndex);

    return `${colorSpaceRowCol.Row.toString(16)}${colorSpaceRowCol.Column.toString(16)}`
  }
}
