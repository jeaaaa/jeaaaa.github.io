import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并多个 class 字符串
 * @param inputs 多个 class 字符串
 * @returns 合并后的 class 字符串
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * 防抖函数，用于限制函数的执行频率。
 * @param func 要执行的函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 一个函数，用于触发防抖操作
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  immediate = false
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<F>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    const doLater = () => {
      timeoutId = undefined;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = immediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, wait);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
};

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间（毫秒）
 * @param options 可选参数
 * @returns 节流后的函数
 */
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {}
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<F> | undefined;
  let lastCallTime: number | undefined;

  const doLater = () => {
    timeoutId = undefined;
    if (lastArgs !== undefined) {
      func.apply(this, lastArgs);
      lastArgs = undefined;
      lastCallTime = Date.now();
      timeoutId = setTimeout(doLater, wait);
    }
  };

  return function (this: any, ...args: Parameters<F>) {
    const currentTime = Date.now();

    if (lastCallTime === undefined && options.leading === false) {
      lastCallTime = currentTime;
    }

    const remainingTime = wait - (currentTime - (lastCallTime ?? 0));

    if (remainingTime <= 0 || remainingTime > wait) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      func.apply(this, args);
      lastCallTime = currentTime;
      timeoutId = setTimeout(doLater, wait);
    } else if (options.trailing !== false) {
      lastArgs = args;
      if (timeoutId === undefined) {
        timeoutId = setTimeout(doLater, remainingTime);
      }
    }
  };
};

/**
 * 判断值是否为 undefined
 * @param val 要判断的值
 * @returns 值是否为 undefined
 */
export const isUndefined = (val: any): val is undefined =>
  typeof val === "undefined";

/**
 * 深拷贝函数
 * @param val 要拷贝的值
 * @returns 拷贝后的值
 */
export const cloneDeep = <T>(val: T): T => {
  if (Array.isArray(val)) {
    return val.map(cloneDeep) as any;
  } else if (typeof val === "object" && val !== null) {
    const result: any = {};
    for (const key in val) {
      result[key] = cloneDeep(val[key]);
    }
    return result;
  } else {
    return val;
  }
};

/**
 * 生成指定范围的数字数组
 * @param start 起始值
 * @param end 结束值
 * @returns 数字数组
 */
export const range = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

/**
 * 从数组中随机取一个元素
 * @param arr 数组
 * @returns 随机元素
 */
export const sample = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * 随机打乱数组元素的顺序
 * @param arr 数组
 * @returns 打乱顺序后的数组
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = 0; i < result.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

/**
 * 浅比较两个数组是否相等
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 两个数组是否相等
 */
export const isShallowEqualArray = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!Object.is(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
};
