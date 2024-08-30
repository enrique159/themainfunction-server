import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations'
import crypto from 'node:crypto'
import Post from '#models/post'
import User from '#models/user'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare content: string

  @column()
  declare postId: string
  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @column()
  declare userId: string
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare parentCommentId: string | null
  @belongsTo(() => Comment, { foreignKey: 'parentCommentId' })
  declare parentComment: BelongsTo<typeof Comment>

  @column()
  declare channelId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @beforeCreate()
  static assignUuid(model: Comment) {
    model.id = crypto.randomUUID({ disableEntropyCache: true })
  }
}
