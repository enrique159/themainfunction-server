import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Post from '#models/post'
import crypto from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PostScript extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string | null

  @column()
  declare language: string

  @column()
  declare content: string

  @column()
  declare userId: string
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare postId: string
  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: PostScript) {
    model.id = crypto.randomUUID({ disableEntropyCache: true })
  }
}
