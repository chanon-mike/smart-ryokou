import databaseConfigs from '@/service/database/base/config';
import { createRepository } from '@/service/database/base/repository';
import type Session from '@/service/database/session/model';

const sessionRepositoryPromise = createRepository<Session>(databaseConfigs.tableName.SESSION);

export default sessionRepositoryPromise;
