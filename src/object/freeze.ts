import { isObject } from "es-toolkit/compat";

export function myFreeze<T extends object>(obj: T): T {
  return new Proxy(obj, {
    set(target, prop, value) {
      console.warn(`Cannot modify frozen object property "${String(prop)}"`);
      return true; // 阻止修改
    },
    deleteProperty(target, prop) {
      console.warn(`Cannot delete property "${String(prop)}" from frozen object`);
      return true; // 阻止删除
    },
    get(target, prop) {
      const value = target[prop as keyof T];
      // 如果是对象，递归冻结
      return isObject(value) ? myFreeze(value) : value;
    }
  }) as T;
}

