import { Controller, Get, ParseEnumPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Task2ApiEndpointsForDataRetrievalService } from './task-2-api-endpoints-for-data-retrieval.service';

enum Categories {
  'Animals',
  'Anime',
  'Anti-Malware',
  'Art & Design',
  'Authentication & Authorization',
  'Blockchain',
  'Books',
  'Business',
  'Calendar',
  'Cloud Storage & File Sharing',
  'Continuous Integration',
  'Cryptocurrency',
  'Currency Exchange',
  'Data Validation',
  'Development',
  'Dictionaries',
  'Documents & Productivity',
  'Email',
  'Entertainment',
  'Environment',
  'Events',
  'Finance',
  'Food & Drink',
  'Games & Comics',
  'Geocoding',
  'Government',
  'Health',
  'Jobs',
  'Machine Learning',
  'Music',
  'News',
  'Open Data',
  'Open Source Projects',
  'Patent',
  'Personality',
  'Phone',
  'Photography',
  'Programming',
  'Science & Math',
  'Security',
  'Shopping',
  'Social',
  'Sports & Fitness',
  'Test Data',
  'Text Analysis',
  'Tracking',
  'Transportation',
  'URL Shorteners',
  'Vehicle',
  'Video',
  'Weather',
}

@ApiTags('Task 2 - Api Endpoints for Data Retrieval')
@Controller('task-2-api-endpoints-for-data-retrieval')
export class Task2ApiEndpointsForDataRetrievalController {
  constructor(
    private readonly task2ApiEndpointsForDataRetrievalService: Task2ApiEndpointsForDataRetrievalService,
  ) {}

  @Get()
  async getEndpointData(
    @Query('category', new ParseEnumPipe(Categories)) category: string,
  ) {
    return await this.task2ApiEndpointsForDataRetrievalService.getEndpointData(
      category,
    );
  }
}
