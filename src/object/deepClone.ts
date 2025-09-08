export function deepClone<T>(target: T, map = new WeakMap()): T {
  if (typeof target !== "object" || target === null) return target;

  // 循环引用处理
  if (map.has(target)) return map.get(target);

  let cloneTarget: any;

  if (Array.isArray(target)) {
    cloneTarget = [];
    map.set(target, cloneTarget);
    for (const item of target) {
      cloneTarget.push(deepClone(item, map));
    }
    return cloneTarget as T;
  }

  // 基于原型创建对象
  cloneTarget = Object.create(Object.getPrototypeOf(target));
  map.set(target, cloneTarget);

  // Reflect.ownKeys 可以获取对象的所有键，包括不可枚举和 Symbol 键
  for (const key of Reflect.ownKeys(target)) {
    cloneTarget[key] = deepClone((target as any)[key], map);
  }

  return cloneTarget;
}
