function myCall<T, R>(
  fn: (this: T, ...args: any[]) => R, 
  thisArg: T, 
  ...args: any[]
): R {
    // 为了避免 this 指向问题，把 fn 临时挂到 thisArg 上
    const context = thisArg ?? globalThis;
    const key = Symbol();
    (context as any)[key] = fn;
    const result = (context as any)[key](...args);
    delete (context as any)[key];
    return result;
}
