type ExtendableEnumType<T extends string> = { [K in T]: K };

// tslint:disable:no-any
// tslint:disable:prefer-type-cast
// tslint:disable:no-object-literal-type-assertion
export class ExtendableEnum {

  private readonly enumeration: any;

  constructor(...values: any[]) {
    const ret = {} as ExtendableEnumType<any>;
    values.forEach(k => ret[k] = k);
    this.enumeration = ret;
  }

  static Create<T extends string>(...values: T[]): ExtendableEnumType<T> {
    const ret = {} as ExtendableEnumType<T>;
    values.forEach(k => ret[k] = k);

    return ret;
  }

  static Extend<T extends string, U extends string>(
    firstEnum: ExtendableEnumType<T>, ...vals: U[]): ExtendableEnumType<T | U> {

      return Object.assign(this.Create(...vals), firstEnum) as any;
  }

}

// const typ = ExtendableEnum.Create('sd');
// export type typ = typeof typ;

// const other = ExtendableEnum.Extend(typ, 'bujaaa');
// type other = typeof other;
