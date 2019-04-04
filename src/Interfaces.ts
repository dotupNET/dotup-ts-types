// tslint:disable-next-line:interface-name
export interface KeyValuePair<TKey, TValue> {
  key: TKey;
  value: TValue;
}

export interface IDisposable {
  dispose(): void;
}
