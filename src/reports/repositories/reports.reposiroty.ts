import { ReportEntity } from '@models/report.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ReportEntity)
export class ReportsReposiroty extends Repository<ReportEntity>{}
