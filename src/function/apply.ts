export default function myApply<T, R>(
  fn: (this: T, ...args: any[]) => R, 
  thisArg: T, 
  args: any[] = []
): R {
    // 和 call 类似，只有传参方式不同
    const context = thisArg ?? globalThis;
    const key = Symbol();
    (context as any)[key] = fn;
    const result = (context as any)[key](...args);
    delete (context as any)[key];
    return result;
}
