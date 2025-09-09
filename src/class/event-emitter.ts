import { remove } from "es-toolkit/array";

// 定义事件类型
type EventHandler<T = any> = (payload: T) => void;

export class EventEmitter<Events extends Record<string, any>> {
  private listeners: {
    [K in keyof Events]?: EventHandler<Events[K]>[]
  } = {};

  // 订阅
  on<K extends keyof Events>(eventName: K, handler: EventHandler<Events[K]>): void {
    (this.listeners[eventName] ??= []).push(handler);
  }

  // 取消订阅
  off<K extends keyof Events>(eventName: K, handler: EventHandler<Events[K]>): void {
    if (!this.listeners[eventName]) return;
    remove(this.listeners[eventName], h => h === handler);
  }

  // 发布事件
  emit<K extends keyof Events>(eventName: K, payload: Events[K]): void {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName]!.forEach(handler => handler(payload));
  }
}
