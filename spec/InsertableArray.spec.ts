import { InsertableArray } from '../src/InsertableArray';

describe('InsertableArray', () => {

  it('should create an instance', () => {
    const value = new InsertableArray();
    expect(value)
      .toBeTruthy();
  });

  it('should insert between 1 and 3', () => {
    const item = new InsertableArray<Number>();

    item.push(1);
    item.push(2);
    item.push(3);

    item.insert(11, 1);

    expect(item[1])
      .toBe(11);
  });

});
