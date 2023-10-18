import type { Document, WithId } from 'mongodb';

interface BaseModel extends WithId<Document> {}

export default BaseModel;
