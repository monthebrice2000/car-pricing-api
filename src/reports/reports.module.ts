import { Module } from '@nestjs/common';
import { ReportsService } from '@services/reports.service';
import { ReportsController } from '@controllers/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsReposiroty } from '@repositories/reports.reposiroty';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportsReposiroty])
  ],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
