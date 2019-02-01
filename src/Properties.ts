// tslint:disable:no-any
export class Properties {

  CopyEachSource<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(source)
      .forEach(item => {
        (<any>target)[item] = (<any>source)[item];
      });

    return target;
  }

  CopyEachTarget<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(target)
      .forEach(item => {
        (<any>target)[item] = (<any>source)[item];
      });

    return target;
  }

  DeepMerge<T>(source: Partial<T>, target: Partial<T>) {
    const s = <any>source;
    const t = <any>target;

    Object
      .keys(s)
      .forEach(item => {

        if (s[item].constructor === Object) {
          this.DeepMerge(t[item], s[item]);
        } else if (Array.isArray(s[item])) {

          if (Array.isArray(t[item])) {
            this.DeepMerge(t[item], s[item]);
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
