import { BadRequestException } from '@nestjs/common';

export interface FiltersEntityQuery {
  [key: string]: any;
}

export function parseStringToObject(input: string): FiltersEntityQuery {
  try {
    // Modify the input to be valid JSON
    const jsonString = input
      .replace(/(\w+):/g, '"$1":') // Wrap keys in double quotes
      .replace(/'/g, '"'); // Replace single quotes with double quotes

    // Parse the modified string as JSON
    const parsedObject = JSON.parse(jsonString);

    return parsedObject;
  } catch (error) {
    throw new BadRequestException(`Failed to parse input: ${error.message}`);
  }
}
