// tslint:disable:no-null-keyword
// tslint:disable:no-increment-decrement
// tslint:disable:no-constant-condition

// @JsonSerializable(true)
// tslint:disable-next-line:no-unnecessary-class
export class ArrayTools {

  // Adds the element at a specific position inside the linked list
  static insert<T>(arr: T[], val: T | T[], previousItem?: T): void {
    const indexOfParent = arr.indexOf(previousItem);

    if (val instanceof Array) {
      // Array
      if (indexOfParent > -1) {
        arr.splice(indexOfParent + 1, 0, ...val);
      } else {
        arr.push(...val);
      }
    } else {
      // one item
      if (indexOfParent > -1) {
        arr.splice(indexOfParent + 1, 0, val);
      } else {
        arr.push(val);
      }
    }
  }

}
