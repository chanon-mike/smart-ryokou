import databaseConfigs from '@/server/service/database/base/config';
import { createRepository } from '@/server/service/database/base/repository';
import type Session from '@/server/service/database/session/model';

const sessionRepositoryPromise = createRepository<Session>(databaseConfigs.tableName.SESSION);

export default sessionRepositoryPromise;
