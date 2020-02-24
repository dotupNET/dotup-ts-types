/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace ObjectTools {

  export function get<T>(obj: object, path: string): T {
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
  export function isInstanceOf<T>(value: any, instanceOf: { new(): any }): value is T {
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
  export function GetMethodNames(obj: any, ...excluded: string[]): string[] {
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


  function hasMethod<T>(obj: T, name: string): boolean {
    const desc = Object.getOwnPropertyDescriptor(obj, name);

    return !!desc && typeof desc.value === "function";
  }

  export function GetOwnMethodNames<T>(instance: any, ...excluded: string[]): string[] {
    const skip: string[] = excluded || [];
    const methods: string[] = [];
    skip.push("constructor");

    const obj = Reflect.getPrototypeOf(instance);
    const keys = Reflect.ownKeys(obj);
    if (obj instanceof Object) {
      keys.forEach((k) => {
        if (hasMethod(obj, k.toString()) && skip.indexOf(k as string) < 0) {
          methods.push(k as string);
        }
      });
    }

    return methods;
  }

  export function CopyEachSource<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(source)
      .forEach(item => {
        (target as any)[item] = (source as any)[item];
      });

    return target;
  }

  export function CopyEachTarget<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(target)
      .forEach(item => {
        (target as any)[item] = (source as any)[item];
      });

    return target;
  }

  export function DeepMerge<T>(source: Partial<T>, target: Partial<T>) {
    const s = source as any;
    const t = target as any;

    Object
      .keys(s)
      .forEach(item => {

        if (s[item].constructor === Object) {
          DeepMerge(t[item], s[item]);
        } else if (Array.isArray(s[item])) {

          if (Array.isArray(t[item])) {
            DeepMerge(t[item], s[item]);
          } else {
            t[item] = s[item];
          }

        } else {
          t[item] = s[item];
        }

      });

    return t;
  }
}
