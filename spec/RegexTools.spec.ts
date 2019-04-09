import { ObjectTools } from '../src/ObjectTools';
import { replace, replacePath } from '../src/RegexTools';


class SubClass {
  prop1: string = 'ValueOfProp1'
  prop2: string = 'ValueOfProp2'
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

describe('RegexTools', () => {

  it('replacePath', () => {
    const myClass = new MyClass();

    const source = 'my text with {subClass.prop1}';
    const target = replacePath(source, myClass);
    expect(target).toBe('my text with ValueOfProp1');

  });

});
