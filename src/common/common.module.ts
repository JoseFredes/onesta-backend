import { Module } from '@nestjs/common';
import { HandleErrorService } from './errors/handle-errors.service';

@Module({
  providers: [HandleErrorService],
  exports: [HandleErrorService],
})
export class CommonModule {}
