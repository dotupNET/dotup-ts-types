import { Properties } from '../src/Properties';

export class Sample {

  run(): void {

    const sourceObject = {
      str: 'src',
      num: 1,
      arr: [
        {
          str: 'arr',
          num: 2,
          arr2: [
            {
              str: 'arr2-1',
              num: 5
            }
          ]
        }
      ]
    };

    const targetObject = {
      str: 's323532rc',
      num: 15533,
      arr: [
        {
          str: 'targetarr33',
          num: 2433332,
          onylInTarget: true,
          arr2: [
            {
              str: 'arsdfgsdgr2-1',
              num: 24354325
            }
          ]
        }
      ]
    };

    const prop = new Properties();
    const result = prop.DeepMerge(sourceObject, targetObject);

    console.log(result);

  }

}

const sample = new Sample();
sample.run();
