import { ArrayTools } from '../src/ArrayTools';

describe('InsertableArray', () => {

  // it('should create an instance', () => {
  //   const value = new InsertableArray();
  //   expect(value)
  //     .toBeTruthy();
  // });

  it('should insert between 1 and 3', () => {
    const arr: Number[] = [];

    arr.push(1);
    arr.push(2);
    arr.push(3);

    ArrayTools.insert(arr, 11, 1);

    expect(arr[1])
      .toBe(11);
  });

});
