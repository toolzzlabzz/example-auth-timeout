import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Bots show', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Bots_show']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when bot exists', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd49')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when bot does not exist', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client.get('api/v1/bot/12345').header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
