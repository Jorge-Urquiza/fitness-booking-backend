import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheckResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => ({ application: { status: 'up' } }),
      async () => this.db.pingCheck('database'),
    ]);
  }
}
