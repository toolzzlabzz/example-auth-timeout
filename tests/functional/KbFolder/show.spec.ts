import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KbFolder show', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@KbFolder_show']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when get KbFolder', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/ffcad24e-0e93-4eed-aaa6-8bc89cdbdc81/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when KbFolder no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/ffcad24e-0e93-4eed-aaa6-8bc89cdbdc80/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/12345/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
