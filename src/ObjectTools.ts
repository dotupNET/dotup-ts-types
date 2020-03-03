import { PropertyNamesOnly, TypedProperty } from "./types";

export class ObjectTools {

  static get<T>(obj: object, path: string): T {
    const props = path.split(".");
    if (props.length > 1) {
      let o = (obj as any)[props[0]];
      return (props as any).reduce((p: any, c: any) => {
        if (o === undefined || o[c] === undefined) {
          o = undefined;
          return undefined;
        }
        o = o[c];
        return o;
      });
    } else {
      return (obj as any)[path];
    }
  }

  /**
   * The classes must use the toStringTag symbol.
   */
  static isInstanceOf<T>(value: any, instanceOf: { new(): any }): value is T {
    if (typeof value !== "object") {
      return false;
    } else if ((instanceOf as any).name !== value.constructor.name) {
      return false;
    } else if (new instanceOf()[Symbol.toStringTag] === value[Symbol.toStringTag]) {
      return true;
    }
    return false;
  }

  // Adds the element at a specific position inside the linked list
  static GetMethodNames(obj: any, ...excluded: string[]): string[] {
    const skip: string[] = excluded || [];
    const methods: string[] = [];
    skip.push("constructor");
    let item = obj;

    while (item = Reflect.getPrototypeOf(item)) {

      const keys = Reflect.ownKeys(item);
      if (item instanceof Object) {
        keys.forEach((k) => {
          if (skip.indexOf(k as string) < 0) {
            methods.push(k as string);
          }
        });
      }
    }

    return methods;
  }

  static hasMethod<T>(obj: T, name: string): boolean {
    const desc = Object.getOwnPropertyDescriptor(obj, name);

    return !!desc && typeof desc.value === "function";
  }

  static GetOwnMethodNames<T>(instance: any, ...excluded: string[]): string[] {
    const skip: string[] = excluded || [];
    const methods: string[] = [];
    skip.push("constructor");

    const obj = Reflect.getPrototypeOf(instance);
    const keys = Reflect.ownKeys(obj);
    if (obj instanceof Object) {
      keys.forEach((k) => {
        if (ObjectTools.hasMethod(obj, k.toString()) && skip.indexOf(k as string) < 0) {
          methods.push(k as string);
        }
      });
    }

    return methods;
  }

  static GetValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  static CopyProps<TSource, TTarget>(source: TSource, ...props: PropertyNamesOnly<TSource>[]): TTarget {
    const result: any = {};  
    for (const prop of props) {
      result[prop] = source[prop];
    }
    return result;
  }

  static CopyPartialProps<TSource>(source: TSource, ...props: PropertyNamesOnly<TSource>[]): Partial<TSource> {
    const result: any = {};

    for (const prop of props) {
      result[prop] = source[prop];
    }

    return result;
  }

  static CopyEachSource<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(source)
      .forEach(item => {
        (target as any)[item] = (source as any)[item];
      });

    return target;
  }

  static CopyEachTarget<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(target)
      .forEach(item => {
        (target as any)[item] = (source as any)[item];
      });

    return target;
  }

  static DeepMerge<T>(source: Partial<T>, target: Partial<T>) {
    const s = source as any;
    const t = target as any;

    Object
      .keys(s)
      .forEach(item => {

        if (s[item].constructor === Object) {
          ObjectTools.DeepMerge(t[item], s[item]);
        } else if (Array.isArray(s[item])) {

          if (Array.isArray(t[item])) {
            ObjectTools.DeepMerge(t[item], s[item]);
          } else {
            t[item] = s[item];
          }

        } else {
          t[item] = s[item];
        }

      });

    return t;
  }

  static ObjectFromArray<
    T extends { [Key in K]: string }, // This is required for the reduce to work
    K extends PropertyNamesOnly<T>
  >(array: Array<T>, indexKey: K): TypedProperty<T> {
    return array.reduce((result: TypedProperty<T>, current: T) => {
      result[current[indexKey]] = current;
      return result;
    }, {});
  }
}
