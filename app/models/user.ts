import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import crypto from 'node:crypto'
import Post from '#models/post'
import PostScript from '#models/post_script'
import Comment from '#models/comment'
import { type HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username: string

  @column()
  declare fullName: string | null

  @column()
  declare profileAvatar: string | null

  @column()
  declare email: string

  @column({ serializeAs: null }) // SerializeAs: null es para que no se muestre en las respuestas de usuario esta columna
  declare password: string

  @column()
  declare bio: string | null

  @column()
  declare location: string | null

  @column()
  declare position: string | null

  @column()
  declare company: string | null

  @column()
  declare country: string | null

  @column()
  declare githubLink: string | null

  @column()
  declare website: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => PostScript)
  declare postScripts: HasMany<typeof PostScript>

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = crypto.randomUUID({ disableEntropyCache: true })
  }
}
