export class EnumTools {
  static getNamesAndValues<T>(e: any): [string, T][] {
    return this.getNames(e).map(_name => [_name, e[_name] as T]);
    // return this.getNames(e).map(_name => { return { name: _name, value: e[_name] as T }; });
  }
  static getNames(e: any): string[] {
    return Object.keys(e).filter(key => isNaN(+key));
  }
  static getName<T>(e: any, value: T): string | undefined {
    const all = this.getNamesAndValues(e).filter(([, enumValue]) => enumValue === value);
    return all.length == 1 ? all[0][0] : undefined;
  }
  static getValue<T>(e: T, key: string): any {
    const allNamesAndValues = this.getNamesAndValues(e).filter(([name,]) => name === key);
    return allNamesAndValues[0][1] as any;
  }
  static getValues<T>(e: any): T[] {
    return this.getNames(e).map(name => e[name]) as T[];
  }
}
