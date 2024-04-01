import { Module } from '@nestjs/common';

import { Task2ApiEndpointsForDataRetrievalService } from './task-2-api-endpoints-for-data-retrieval.service';
import { Task2ApiEndpointsForDataRetrievalController } from './task-2-api-endpoints-for-data-retrieval.controller';

@Module({
  providers: [Task2ApiEndpointsForDataRetrievalService],
  controllers: [Task2ApiEndpointsForDataRetrievalController],
})
export class Task2ApiEndpointsForDataRetrievalModule {}
