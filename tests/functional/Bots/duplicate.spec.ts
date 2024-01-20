import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Bots duplicate', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@Bots_duplicate']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when duplicate a bot', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '7e2f4322-5e74-4e99-b0c6-31f727edcd49',
      })
    response.assertStatus(200)
  })

  test('should return 422 when no bot id is provided', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 404 when no get bot id', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '7e2f4322-5e74-4e99-b0c6-31f727edcd40',
      })
    response.assertStatus(404)
  })

  test('should return 422 when duplicate a bot with invalid UUID', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '12345',
      })
    response.assertStatus(422)
  })
})
