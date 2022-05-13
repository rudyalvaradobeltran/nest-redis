import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Profile } from './common/models/Profile';

@Controller()
export class AppController {
  fakeValue = 'My name is Juan';
  fakeModel: Profile = {
    name: 'Juan',
    email: 'juan@gmail.com',
  };

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('getCacheString')
  async getSimpleString() {
    const value = await this.cacheManager.get('my-string');
    if (value) {
      return {
        data: value,
        loadsFrom: 'redis cache',
      };
    }
    await this.cacheManager.set('my-string', this.fakeValue, { ttl: 300 });
    return {
      data: this.fakeValue,
      loadFrom: 'fake data',
    };
  }

  @Get('getObject')
  async getObject() {
    const profile = await this.cacheManager.get<Profile>('my-profile');
    if (profile) {
      return {
        data: profile,
        loadsFrom: 'redis cache',
      };
    }
    await this.cacheManager.set<Profile>('my-profile', this.fakeModel, {
      ttl: 300,
    });
    return {
      data: this.fakeModel,
      loadFrom: 'fake model',
    };
  }

  @Get('delete')
  async deleteCache() {
    await this.cacheManager.del('my-string');
    await this.cacheManager.del('my-profile');
  }

  @Get('reset')
  async resetCache() {
    await this.cacheManager.reset();
  }
}
