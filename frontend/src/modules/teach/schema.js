import { schema } from 'normalizr'

export const batchSchema = new schema.Entity('batch', {}, {idAttribute: 'batch_id'})
export const batchListSchema = new schema.Array(batchSchema)
export const itemSchema = new schema.Entity('item', {}, {idAttribute: 'id'})
export const itemListSchema = new schema.Array(itemSchema)
export const studentSchema = new schema.Entity('student', {}, {idAttribute: 'id'})
export const studentListSchema = new schema.Array(studentSchema)
