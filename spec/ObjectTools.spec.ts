import { ObjectTools } from '../src/ObjectTools';

class BaseClass {
  basprop: string;
  async Stop() {

  }
}

class MyClass extends BaseClass {

  private x: string = 'x';

  async B() {
    console.log(this);
  }
  async A() {
    console.log(this);
  }

  async C() {
    console.log(this);
  }
}

describe('ObjectTools', () => {

  // it('should create an instance', () => {
  //   const value = new InsertableArray();
  //   expect(value)
  //     .toBeTruthy();
  // });

  it('should list methods', () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetMethodNames(myClass);

    expect(names.length)
      .toBe(4);

    expect(names[1])
      .toBe('A');

  });

});
