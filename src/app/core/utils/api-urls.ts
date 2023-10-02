import { replaceUrlParams } from '../utils/_index';

/** URLs en la API. */
export const ApiUrls = {
  /** Auth. */
  login: 'identity/login',

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value de.
   */
  replace: (url: string, args: Record<string, string>): string => replaceUrlParams(url, args)
};
