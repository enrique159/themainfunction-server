import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(6).nullable(),
    fullName: vine.string().trim().nullable(),
    email: vine.string().trim().email().nullable(),
    password: vine.string().trim().minLength(8).maxLength(20).nullable(),
    bio: vine.string().trim().optional(),
    location: vine.string().trim().optional(),
    company: vine.string().trim().optional(),
    country: vine.string().trim().optional(),
    githubLink: vine.string().trim().optional(),
    website: vine.string().trim().optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional(),
    bio: vine.string().trim().optional(),
    location: vine.string().trim().optional(),
    company: vine.string().trim().optional(),
    country: vine.string().trim().optional(),
    githubLink: vine.string().trim().optional(),
    website: vine.string().trim().optional(),
  })
)
