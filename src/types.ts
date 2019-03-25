
export declare type TypeSaveProperty<T> = { [K in keyof T]: T[K]; };

export declare type FunctionNamesOnly<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export declare type FunctionsOnly<T> = Pick<T, FunctionNamesOnly<T>>;

export declare type PropertyNamesOnly<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export declare type PropertiesOnly<T> = Pick<T, PropertyNamesOnly<T>>;

// tslint:disable-next-line: max-line-length
// export declare type NestedPartialObject<TParent extends string, TChild extends string, TContent> = { [P in TParent]?: NestedObjectChild<TChild, TContent> };
// tslint:disable-next-line: max-line-length
// export declare type NestedObject<TParent extends string, TChild extends string, TContent> = { [P in TParent]: NestedObjectChild<TChild, TContent> };
// export declare type NestedObjectChild<T extends string, TContent> = { [P in T]: TContent };

/**
* The MockOf type takes a class and an optional union of public members which 
* should be excluded in our mock.
*/
type MockOf<Class, Omit extends keyof Class = never> = {
  [Member in Exclude<keyof Class, Omit>]: Class[Member];
}

export declare type Nested<T extends string, TContent> = {
  [P in T]: TContent;
};

export declare type PartialNested<T extends string, TContent> = {
  [P in T]?: TContent;
};

// tslint:disable-next-line: no-any
export type Weaken<T, K extends keyof T> = { [P in keyof T]: P extends K ? any : T[P]; };

// ```ts
// type Weaken<T, K extends keyof T> = {
//   [P in keyof T]: P extends K ? any : T[P];
// };
// ```


// And then you can simply:


// ```ts
// export interface A {
//   prop1: string;
//   prop2: number;
// }

// export interface ANew extends Weaken<A, 'prop1'> {
//   prop1: boolean; // No errors here as `prop1` is weakened to type `any`
// }
