import vine from '@vinejs/vine'

/**
 * Validates the dependencies creation action
 */
export const createDependencyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    version: vine.string().trim().minLength(5),
    url: vine.string().url().trim(),
    status: vine.boolean().optional(),
    integrity: vine.string().trim().minLength(6).optional(),
  })
)

/**
 * Validates the dependencies update action
 */
export const updateDependencyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    version: vine.string().trim().minLength(6),
    url: vine.string().url().trim(),
    status: vine.boolean().optional(),
    integrity: vine.string().trim().minLength(6).optional(),
  })
)

/**
 * Validates the scope creation action
 */
export const createScopeValidator = vine.compile(
  vine.object({
    path: vine.string().trim().minLength(2),
    name: vine.string().trim().minLength(5),
    url: vine.string().url().trim(),
    status: vine.boolean().optional(),
  })
)
