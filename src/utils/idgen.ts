import { customAlphabet } from 'nanoid';

export function nanoid(
  length = 21,
  alphabet = '0123456789abcdefghijklmnopqrstuvwxyz',
) {
  return customAlphabet(alphabet, length)();
}
