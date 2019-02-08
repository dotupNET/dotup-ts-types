// tslint:disable:no-any
import { ArrayTools } from '../src/ArrayTools';

describe('ArrayTools', () => {

  it('should get keys of 3 elements from array', () => {
    const arr: any[] = [];

    arr.push(1);
    arr.push('2');
    arr.push({ item: 'value' });
    arr.push('4');
    arr.push('5');

    const keys = ArrayTools.getUniqueRandomKeys(arr, 2);

    expect(keys.length)
      .toBe(2);

    keys.forEach(key => {
      expect(arr[<any>key])
        .toBeTruthy();
    });
  });

  it('should get values of 3 elements from array', () => {
    const arr: any[] = [];

    arr.push(1);
    arr.push('2');
    arr.push({ item: 'value' });
    arr.push('4');
    arr.push('5');

    const values = ArrayTools.getUniqueRandomValues(arr, 2);

    expect(values.length)
      .toBe(2);

    values.forEach(value => {
      expect(arr.indexOf(value) > -1)
        .toBeTruthy();
    });
  });

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
