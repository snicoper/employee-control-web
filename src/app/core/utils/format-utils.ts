export abstract class FormatUtils {
  /**
   * Pasar bytes a una medida legible según el size.
   *
   * @param value Bytes a transformar.
   * @returns Un string con los bytes convertidos a la unidad mas cercana.
   */
  static formatSizeUnit(value: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (value === 0) {
      return '0 Byte';
    }

    const i = parseInt(String(Math.floor(Math.log(value) / Math.log(1024))), 10);

    return `${Math.round(value / Math.pow(1024, i))} ${sizes[i]}`;
  }
}
