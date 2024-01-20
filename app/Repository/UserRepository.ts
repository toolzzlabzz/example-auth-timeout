import { prisma } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IUserRegistration } from 'App/Interfaces/user'

export default class UserRepository {
  /**
   * Find a user by email.
   *
   * @param {string} email - The email of the user.
   * @return {Promise<User | null>} The user found, or null if not found.
   */
  public async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  public async findById(id) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
  }

  /**
   * Registers a new user with the provided user data.
   *
   * @param {IUserRegistration} userData - The user registration data.
   * @return {Promise<any>} - A promise that resolves to the registered user data.
   */
  public async registerAnUser(userData: IUserRegistration) {
    try {
      return await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: await Hash.make(userData.password),
          institutionId: userData.institutionId,
        },
      })
    } catch (error) {
      return error
    }
  }
  /**
   * Checks if a user belongs to an institution.
   *
   * @param {number} userId - The ID of the user.
   * @param {number} institutionId - The ID of the institution.
   * @return {Promise<boolean>} A boolean indicating whether the user belongs to the institution.
   */
  public async userBelongsToInstitution(userId: string, institutionId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }
    if (!user) {
      throw new Error('User not found')
    }

    return user.institutionId === institutionId
  }

  /**
   * Obtém a instituição do usuário autenticado.
   *
   * @param {HttpContextContract} ctx - O contexto HTTP.
   * @return {Promise<string | null>} O ID da instituição do usuário ou null se o usuário não estiver autenticado.
   */
  public async getInstitutionFromUser(ctx: HttpContextContract): Promise<string | null> {
    try {
      const institutionId = ctx.auth.user?.institutionId
      if (!institutionId) {
        throw new Error('User is not authenticated')
      }
      return institutionId
    } catch (error) {
      return error
    }
  }
}
