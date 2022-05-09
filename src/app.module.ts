import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 5003,
    }),
  ],
})
export class AppModule {}
