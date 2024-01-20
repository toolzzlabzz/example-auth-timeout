import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.required()
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed(),
      rules.required(),
      rules.minLength(8),
      rules.maxLength(16),
      rules.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/),
    ]),
    name: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(255),
      rules.required(),
    ]),
    institutionId: schema.string([rules.required(), rules.uuid()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'email.required': 'Email field is required.',
    'email.email': 'You must provide a valid email address.',
    'password.required': 'Password field is required.',
    'password.confirmed': 'Password confirmation does not match the provided password.',
    'name.required': 'Name field is required.',
    'name.alpha': 'Name should only contain alphabets.',
    'name.minLength': 'Name should be at least 2 characters long.',
    'name.maxLength': 'Name should not exceed 255 characters.',
  }
}
