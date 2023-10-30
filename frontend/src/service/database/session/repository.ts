import databaseConfigs from '../base/config';
import { createRepository } from '../base/repository';
import type Session from './model';

const sessionRepositoryPromise = createRepository<Session>(databaseConfigs.tableName.SESSION);

export default sessionRepositoryPromise;
