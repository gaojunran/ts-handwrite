export default function shallowClone<T extends object>(target: T): T {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  const cloneTarget = Array.isArray(target) ? [] : {} as T;

  for (const key in target) {
    if (Object.hasOwn(target, key)) {
      (cloneTarget as any)[key] = target[key];
    }
  }

  return cloneTarget as T;
}
