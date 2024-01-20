import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Bots index by creator', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Bots_index_by_creator']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when bots are found for the creator', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/442a9e56-2c03-4597-96f5-7f976bc14855')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when no bots are found for the creator', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/442a9e56-2c03-4597-96f5-7f976bc14850')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when userId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 422 when userId is not provided', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/:userId')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
