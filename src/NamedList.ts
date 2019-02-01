export class NamedList<T> {

  UniqueField: keyof T;

  Name: string;

  Items: T[];

  constructor(listName: string, uniqueField?: keyof T) {
    this.Name = listName;
    this.UniqueField = uniqueField;
    this.Items = [];
  }

  Add(item: T): void {
    if (this.UniqueField) {
      if (this.HasItem(item[this.UniqueField], this.UniqueField)) {
        throw new Error(`ListItem already exists in list '${this.Name}'`);
      }
    }

    this.Items.push(item);
  }

  Remove(item: T): void {
    const index = this.Items.indexOf(item);
    if (index > -1) {
      this.Items.splice(index, 1);
    }
  }

  Contains(item: T): boolean {
    return this.Items.indexOf(item) > -1;
  }

  GetRandomItem(): T {
    let result: T;
    if (Array.isArray(this.Items)) {
      // tslint:disable-next-line:insecure-random
      result = this.Items[Math.floor(Math.random() * this.Items.length)];
    }

    return result;
  }

  HasItems(): boolean {
    return this.Items.length > 0;
  }

  HasItem(value: T[keyof T], propertyName: keyof T = this.UniqueField): boolean {
    if (!value || !propertyName) {
      return false;
    }
    const index = this.Items.findIndex((item: T, itemIndex: number) => {
      if (item[propertyName] === value) {
        return true;
      } else {
        return false;
      }
    });

    return index > -1;
  }

  GetItem(predicate: (item: T) => boolean): T {
    return this.Items.find(predicate);
  }

  FindBy(value: T[keyof T], propertyName: keyof T = this.UniqueField): T {
    if (!value || !propertyName) {
      return undefined;
    }

    return this.Items.find((item: T, itemIndex: number) => {
      if (item[propertyName] === value) {
        return true;
      } else {
        return false;
      }
    });

  }

  Find(value: T): T {
    if (!value) {
      return undefined;
    }

    return this.Items.find((item: T, itemIndex: number) => {
      if (item === value) {
        return true;
      } else {
        return false;
      }
    });

  }

  OrderBy(orderField: keyof T = this.UniqueField): T[] {
    if (orderField) {
      return this.Items.sort((a, b) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }

        return 0;
      });
    } else {
      return this.Items.sort((a, b) => {
        if (a[orderField] < b[orderField]) {
          return -1;
        }

        if (a[orderField] > b[orderField]) {
          return 1;
        }

        return 0;
      });
    }
  }

  Reset(): void {
    this.Items = [];
  }

}
