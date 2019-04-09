import { ObjectTools } from '../src/ObjectTools';
import { WithStringTag } from './StringTagClass';

class SubClass {
  prop1: string = 'ValueOfProp1'
}

class BaseClass {
  basprop: string;
  async Stop() {

  }
}

class MyClass extends BaseClass {
  z: string = 'valueOfZ';

  subClass: SubClass = new SubClass();

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

  it('GetMethodNames', () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetMethodNames(myClass, 'C');

    expect(names.length)
      .toBe(3);

    expect(names[1])
      .toBe('A');

  });

  it('GetByPath', () => {
    const myClass = new MyClass();

    const value = ObjectTools.get(myClass, 'z');
    expect(value).toBe('valueOfZ');

    const deepValue = ObjectTools.get(myClass, 'subClass.prop1');
    expect(deepValue).toBe('ValueOfProp1');

    const deepValueUNdef = ObjectTools.get(myClass, 'subClass.de.prop1');
    expect(deepValueUNdef).toBe(undefined);

  });

  it('isInstanceOf', () => {
    const a = new WithStringTag();

    const result = ObjectTools.isInstanceOf(a, WithStringTag);
    expect(result).toBeTruthy();
  });

  it('GetOwnMethodNames', () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetOwnMethodNames(myClass, 'B');

    expect(names.length)
      .toBe(2);

    expect(names[0])
      .toBe('A');

    expect(names[1])
      .toBe('C');

  });

});
