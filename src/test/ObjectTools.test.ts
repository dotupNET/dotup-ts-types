import { expect } from "chai";
import { ObjectTools } from "../ObjectTools";
import { WithStringTag } from "./StringTagClass";

class SubClass {
  prop1 = "ValueOfProp1"
}

class BaseClass {
  basprop: string;
  // async Stop() {

  // }
}

class MyClass extends BaseClass {
  z = "valueOfZ";

  subClass: SubClass = new SubClass();

  private x = "x";

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

describe("ObjectTools", () => {

  it("GetMethodNames", () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetMethodNames(myClass, "C");

    expect(names.length).to.equal(2);

    expect(names[1])
      .to.equal("A");

  });

  it("GetByPath", () => {
    const myClass = new MyClass();

    const value = ObjectTools.get(myClass, "z");
    expect(value).to.equal("valueOfZ");

    const deepValue = ObjectTools.get(myClass, "subClass.prop1");
    expect(deepValue).to.equal("ValueOfProp1");

    const deepValueUNdef = ObjectTools.get(myClass, "subClass.de.prop1");
    expect(deepValueUNdef).to.equal(undefined);

  });

  it("isInstanceOf", () => {
    const a = new WithStringTag();

    const result = ObjectTools.isInstanceOf(a, WithStringTag);
    expect(result).be.true;
  });

  it("GetOwnMethodNames", () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetOwnMethodNames(myClass, "B");

    expect(names.length).to.equal(2);

    expect(names[0]).to.equal("A");

    expect(names[1]).to.equal("C");

  });

});
