import myApply from "./apply";

function myBind<T, A extends any[], R>(
  fn: (this: T, ...args: A) => R, 
  thisArg: T, 
  ...boundArgs: A
) {
    return function (...args: A): R {
        return myApply(fn, thisArg, [...boundArgs, ...args]);
    };
}
