export interface FieldsEntityQuery {
  [key: string]: true | { select: FieldsEntityQuery };
}

export function validateString(input: string): boolean {
  const stack: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '{') {
      stack.push('{');
    } else if (char === '}') {
      if (stack.length === 0 || stack[stack.length - 1] !== '{') {
        return false; // Mismatched closing parenthesis
      }

      stack.pop();
    } else if (char === ',') {
      if (
        i === 0 ||
        i === input.length - 1 ||
        input[i - 1] === ' ' ||
        input[i + 1] === ' ' ||
        input[i + 1] === '}'
      ) {
        return false; // Invalid comma placement
      }
    }
  }

  return stack.length === 0 && !input.includes('{}'); // All opening parentheses have been closed
}

export function parseEntityQuery(queryString: string): FieldsEntityQuery {
  const stack: FieldsEntityQuery[] = [];
  let currentSet: FieldsEntityQuery = {};
  let currentKey = '';

  const pushSet = () => {
    if (currentKey) {
      stack.push(currentSet);
      const newSet: FieldsEntityQuery = {};
      currentSet[currentKey] = { select: newSet };
      currentSet = newSet;
      currentKey = '';
    }
  };

  for (let i = 0; i < queryString.length; i++) {
    const char = queryString[i];
    if (char === ' ') {
      continue;
    } else if (char === '{') {
      pushSet();
    } else if (char === '}') {
      if (currentKey) {
        currentSet[currentKey] = true;
        currentKey = '';
      }
      if (stack.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentSet = stack.pop()!;
      }
    } else if (char === ',') {
      if (currentKey) {
        currentSet[currentKey] = true;
        currentKey = '';
      }
    } else {
      currentKey += char;
    }
  }

  return currentSet;
}
