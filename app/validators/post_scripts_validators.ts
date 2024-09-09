import vine from '@vinejs/vine'

export const createPostScriptValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    language: vine.string(),
    content: vine.string(),
  })
)
