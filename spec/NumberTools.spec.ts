// tslint:disable:no-any
import { NumberTools } from '../src/NumberTools';

describe('NumberTools', () => {

  it('should get random value', () => {

    let result = NumberTools.random(0);
    expect(result).toEqual(0);

    result = NumberTools.random(10, 10);
    expect(result).toEqual(10);

    result = NumberTools.random(-20, -20);
    expect(result).toEqual(-20);

    result = NumberTools.random(3);
    expect(result >= 0 && result < 4).toBeTruthy();

    result = NumberTools.random(300);
    expect(result >= 0 && result < 301).toBeTruthy();

    result = NumberTools.random(100000, 99999);
    expect(result >= 99999 && result < 100001).toBeTruthy();

  });

});
