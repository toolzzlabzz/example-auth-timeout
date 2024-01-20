import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Bots delete', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Bots_delete']))

  const token = Env.get('TEST_TOKEN')

  test('should return 404 when botId not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(404)
  })

  test('should return 422 when botId is not a valid UUID', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/12345')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '12345' })
    response.assertStatus(422)
  })

  test('should return 200 when delete bot', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd49')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '7e2f4322-5e74-4e99-b0c6-31f727edcd49' })
    response.assertStatus(200)
  })
})
