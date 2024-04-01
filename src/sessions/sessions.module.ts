import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [JwtModule],
  exports: [SessionsService],
  providers: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
