import { DateTime } from 'luxon'
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Comment from '#models/comment'
import PostScript from '#models/post_script'
import crypto from 'node:crypto'
import { type TPrivacyPost } from '#domain/PrivacyPost'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare content: string

  @column()
  declare privacy: TPrivacyPost

  @column()
  declare media: string | null

  @column()
  declare script: string | null

  @column()
  declare userId: string
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare organizationId: string | null

  @column()
  declare channelId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => PostScript)
  declare scripts: HasMany<typeof PostScript>

  @beforeCreate()
  static assignUuid(post: Post) {
    post.id = crypto.randomUUID({ disableEntropyCache: true })
  }
}
