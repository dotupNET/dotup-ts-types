// tslint:disable:no-null-keyword
// tslint:disable:no-increment-decrement
// tslint:disable:no-constant-condition

// @JsonSerializable(true)
export class InsertableArray<T> extends Array<T> {

  constructor(...values: T[]) {
    super();

    if (values) {
      this.insert(values);
    }
  }

  // Adds the element at a specific position inside the linked list
  insert(val: T | T[], previousItem?: T): void {
    const indexOfParent = this.indexOf(previousItem);

    if (val instanceof Array) {
      // Array
      if (indexOfParent > -1) {
        this.splice(indexOfParent + 1, 0, ...val);
      } else {
        this.push(...val);
      }
    } else {
      // one item
      if (indexOfParent > -1) {
        this.splice(indexOfParent + 1, 0, val);
      } else {
        this.push(val);
      }
    }
  }

}
