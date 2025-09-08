export default function shallowClone<T extends object>(target: T): T {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 空对象不能用于索引字符串键。需要显式地声明为 Record<string | symbol, any>
  const cloneTarget: Record<string, any> = Array.isArray(target) ? [] : {};

  // for...in 会 枚举对象的自有属性 + 可枚举的继承属性。
  // for (const key in target) {
  //   if (Object.hasOwn(target, key)) {
  //     (cloneTarget as any)[key] = target[key];
  //   }
  // }

  // Object.keys 只会枚举对象的自有属性。
  for (const key of Object.keys(target)) {
    cloneTarget[key] = target[key as keyof T]
  }

  return cloneTarget as T;
}
