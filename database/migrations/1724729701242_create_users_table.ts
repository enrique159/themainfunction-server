import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('users', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('username').notNullable().unique()
      table.string('full_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('bio').nullable()
      table.string('location').nullable()
      table.string('company').nullable()
      table.string('country').nullable()
      table.string('github_link').nullable()
      table.string('website').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('organizations', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable().unique()
      table.string('description').nullable()
      table.string('location').nullable()
      table.string('website').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('organization_roles', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable().unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('organization_channels', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('organization_id').notNullable()
      table.string('name').notNullable()
      table.string('description').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.foreign('organization_id').references('organizations.id')
    })

    this.schema.createTable('posts', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('user_id').notNullable()
      table.string('content').notNullable()
      table.uuid('organization_id').nullable()
      table.uuid('channel_id').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.foreign('user_id').references('users.id')
      table.foreign('organization_id').references('organizations.id')
      table.foreign('channel_id').references('organization_channels.id')
    })

    this.schema.createTable('comments', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('post_id').notNullable()
      table.uuid('user_id').notNullable()
      table.string('content').notNullable()
      table.uuid('parent_comment_id').nullable()
      table.uuid('channel_id').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.foreign('post_id').references('posts.id')
      table.foreign('user_id').references('users.id')
      table.foreign('parent_comment_id').references('comments.id')
      table.foreign('channel_id').references('organization_channels.id')
    })

    this.schema.createTable('followers', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('follower_id').notNullable()

      table.primary(['user_id', 'follower_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('follower_id').references('users.id')
    })

    this.schema.createTable('rockets', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('post_id').notNullable()

      table.primary(['user_id', 'post_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('post_id').references('posts.id')
    })

    this.schema.createTable('forks', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('post_id').notNullable()

      table.timestamp('created_at').notNullable()

      table.primary(['user_id', 'post_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('post_id').references('posts.id')
    })

    this.schema.createTable('organization_members', (table) => {
      table.uuid('organization_id').notNullable()
      table.uuid('user_id').notNullable()
      table.uuid('role_id').notNullable()

      table.timestamp('joined_at').notNullable()

      table.primary(['organization_id', 'user_id'])

      table.foreign('organization_id').references('organizations.id')
      table.foreign('user_id').references('users.id')
      table.foreign('role_id').references('organization_roles.id')
    })

    this.schema.createTable('channel_members', (table) => {
      table.uuid('channel_id').notNullable()
      table.uuid('user_id').notNullable()

      table.primary(['channel_id', 'user_id'])

      table.foreign('channel_id').references('organization_channels.id')
      table.foreign('user_id').references('users.id')
    })

    this.schema.createTable('friends', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('friend_id').notNullable()

      table.primary(['user_id', 'friend_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('friend_id').references('users.id')
    })

    this.schema.createTable('messages', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('sender_id').notNullable()
      table.uuid('receiver_id').notNullable()
      table.string('content').notNullable()

      table.timestamp('sent_at').notNullable()

      table.foreign('sender_id').references('users.id')
      table.foreign('receiver_id').references('users.id')
    })

    this.schema.createTable('user_links', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('user_id').notNullable()
      table.string('url').notNullable()
      table.string('description').nullable()

      table.foreign('user_id').references('users.id')
    })

    this.schema.createTable('tags', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable().unique()
    })

    this.schema.createTable('user_tags', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('tag_id').notNullable()

      table.primary(['user_id', 'tag_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('tag_id').references('tags.id')
    })

    this.schema.createTable('post_tags', (table) => {
      table.uuid('post_id').notNullable()
      table.uuid('tag_id').notNullable()

      table.primary(['post_id', 'tag_id'])

      table.foreign('post_id').references('posts.id')
      table.foreign('tag_id').references('tags.id')
    })

    this.schema.createTable('saved_posts', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('post_id').notNullable()

      table.timestamp('saved_at').notNullable()

      table.primary(['user_id', 'post_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('post_id').references('posts.id')
    })

    this.schema.createTable('comment_rockets', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('comment_id').notNullable()

      table.primary(['user_id', 'comment_id'])

      table.foreign('user_id').references('users.id')
      table.foreign('comment_id').references('comments.id')
    })
  }

  async down() {
    this.schema.dropTable('users')
  }
}
