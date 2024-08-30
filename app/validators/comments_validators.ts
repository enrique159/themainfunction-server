import vine from '@vinejs/vine'

export const createPostCommentValidator = vine.compile(
  vine.object({
    content: vine.string().minLength(1).maxLength(255),
    channelId: vine.string().uuid().optional(),
    parentCommentId: vine.string().uuid().optional(),
  })
)
