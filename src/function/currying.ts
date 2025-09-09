type AnyFunc = (...args: any[]) => any;

// 检查 T 是否是 P 的前缀，并返回剩余的参数
type DropPrefix<P extends any[], T extends any[]> =
  P extends [...T, ...infer Rest] ? Rest : never;

// Curry 类型
type Curry<F extends AnyFunc> =
  F extends (...args: infer P) => infer R
    ? <T extends [any, ...any[]]>(...args: T) =>
        DropPrefix<P, T>['length'] extends 0
          ? R
          : Curry<(...args: DropPrefix<P, T>) => R>
    : never;


function currying<F extends AnyFunc>(fn: F): Curry<F> {
  function curried(this: any, ...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...next: any[]) => 
        curried.apply(this, args.concat(next));
    }
  }
  return curried as Curry<F>;
}

// 使用示例
function add(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
}

const curriedAdd = currying(add);

console.log(curriedAdd(1)(2)(3)(4));   // ✅ 10
console.log(curriedAdd(1, 2)(3, 4));   // ✅ 10
console.log(curriedAdd(1, 2, 3, 4));   // ✅ 10
