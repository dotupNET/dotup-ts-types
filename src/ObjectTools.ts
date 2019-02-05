// tslint:disable:no-any
export module ObjectTools {

  // Adds the element at a specific position inside the linked list
  export function GetMethodNames(obj: any, excluded: string[] = ['constructor']): string[] {
    const methods: string[] = [];
    let item = obj;

    // tslint:disable-next-line:no-conditional-assignment
    while (item = Reflect.getPrototypeOf(item)) {

      const keys = Reflect.ownKeys(item);
      if (item instanceof Object) {
        keys.forEach((k) => {
          if (excluded.indexOf(<string>k) < 0) {
            methods.push(<string>k);
          }
        });
      }
    }

    return methods;
  }

  export function CopyEachSource<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(source)
      .forEach(item => {
        (<any>target)[item] = (<any>source)[item];
      });

    return target;
  }

  export function CopyEachTarget<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(target)
      .forEach(item => {
        (<any>target)[item] = (<any>source)[item];
      });

    return target;
  }

  export function DeepMerge<T>(source: Partial<T>, target: Partial<T>) {
    const s = <any>source;
    const t = <any>target;

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
