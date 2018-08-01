import { schema } from 'normalizr'

export const batchSchema = new schema.Entity('batch', {}, {idAttribute: 'batch_id'})
export const batchListSchema = new schema.Array(batchSchema)
