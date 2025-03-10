import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(4),
  })
)
const registerUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(1).unique({ table: 'users', column: 'email' }),
    password: vine.string(),
    full_name: vine.string(),
  })
)
export { loginUserValidator, registerUserValidator }
