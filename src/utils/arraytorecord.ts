export function arrayToRecord<T = any>(
  arr: T[],
  key: keyof T,
  keyToTake?: keyof T,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const item of arr) {
    result[item[key] as string] = keyToTake ? item[keyToTake] : item;
  }

  return result;
}
