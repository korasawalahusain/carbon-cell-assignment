import { Injectable } from '@nestjs/common';

@Injectable()
export class Task2ApiEndpointsForDataRetrievalService {
  async getEndpointData(category: string) {
    const rawResult = await fetch(
      `https://api.publicapis.org/entries${!!category && category.trim() !== '' ? `?category=${category}` : ''}`.trim(),
    );

    const result = await rawResult.json();

    return result;
  }
}
