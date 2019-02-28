export interface IPlugin {
  initialize<T>(args: T): void;
}
