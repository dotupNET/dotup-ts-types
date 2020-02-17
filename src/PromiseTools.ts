// tslint:disable-next-line: no-require-imports
import { EventEmitter } from 'events';
import { AsyncCallbackFunction } from "./types";

export async function sleep(ms: number): Promise<void> {
  // tslint:disable-next-line: no-string-based-set-timeout
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function Event<T>(emitter: EventEmitter, event: string, timeout?: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    emitter.on(event, _ => resolve());
  });
}

// tslint:disable-next-line: max-line-length : no-any
export async function timeoutAfter<T>(timeout: number, executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T> {
  const p = new Promise<T>((resolve, reject) =>
    setTimeout(
      () =>
        reject(`Timed out after ${timeout} ms.`),
      timeout)
  );

  return Promise.race<T>([
    new Promise<T>(executor),
    p
  ]);
}

export async function timeoutPromise<T>(timeout: number, promise: Promise<T>): Promise<T> {
  const p = new Promise<T>((resolve, reject) =>
    setTimeout(
      () => reject(`Timed out after ${timeout} ms.`),
      timeout)
  );

  return Promise.race<T>([
    promise,
    p
  ]);
}

export function Async<T>(action: () => Promise<T>, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): void {
  action()
    .catch(e => {
      if (onrejected) onrejected(e);
      console.log(e);
    });
}


export async function AsyncCallback<TResult, TArg>(arg: TArg, action: AsyncCallbackFunction<TResult, TArg>): Promise<TResult> {
  return new Promise((resolve, reject) => {
    action(arg, (err: Error, val: TResult) => {
      if (err) {
        reject(err);
      } else {
        resolve(val);
      }
    });
  })
}
