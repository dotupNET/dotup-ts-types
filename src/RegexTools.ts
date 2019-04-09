import { IUrl } from './Interfaces';
import { ObjectTools } from './ObjectTools';

export function parseUrl(url: string): IUrl {
  // tslint:disable-next-line: max-line-length
  const parts = /(?:(?:(([^:\/#\?]+:)?(?:(?:\/\/)(?:(?:(?:([^:@\/#\?]+)(?:\:([^:@\/#\?]*))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((?:\/?(?:[^\/\?#]+\/+)*)(?:[^\?#]*)))?(\?[^#]+)?)(#.*)?/.exec(url);

  return {
    href: parts[0],
    origin: parts[1],
    protocol: parts[2],
    username: parts[3],
    password: parts[4],
    host: parts[5],
    hostname: parts[6],
    port: Number(parts[7]),
    pathname: parts[8],
    search: parts[9],
    hash: parts[10]
  };
}

/**
 * Replace placeholder in text with args
 *
 * Indexed:
 * const str = RegexTools.replace('{1} {0}', 'tool', 'Nice'};
 *
 * With Object:
 * const str = RegexTools.replace('{a} {b}', {b: 'tool', a: 'Nice'}};
 *
 */
export function replace(text: string, ...args: any[]): string {
  let result = text;

  if (args.length) {
    const t = typeof args[0];
    var key;
    var values: any = (t === 'string' || t === 'number') ?
      Array.prototype.slice.call(args) :
      args[0];

    for (key in values) {
      result = result.replace(new RegExp("\\{" + key + "\\}", "gi"), values[key]);
    }
  }

  return result;
};

/**
 * Replace placeholder in text with args
 *
 * With Object:
 * const str = RegexTools.replacePath('{a} {b.1}', {b: {1:'tool'}, a: 'Nice'}};
 *
 */
export function replacePath(text: string, ...args: any[]): string {
  let result = text;

  if (args.length) {
    var values: any = args[0];

    // const x = /\{(.*?)\}/.exec(text);
    const x = /(?<=\{).+?(?=\})/.exec(text);
    x.forEach((match) => {
      result = result.replace(`{${match}}`, ObjectTools.get(values, match));
    });
  }

  return result;
};
