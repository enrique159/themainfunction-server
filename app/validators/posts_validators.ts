import { TPrivacyPost } from '#domain/PrivacyPost'
import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    content: vine.string().minLength(1).maxLength(500),
    privacy: vine.enum(['public', 'friends', 'just-me', 'custom'] as TPrivacyPost[]),
    media: vine.string().optional(),
    script: vine.string().maxLength(500).optional(),
    organizationId: vine.string().uuid().optional(),
    channelId: vine.string().uuid().optional(),
  })
)
