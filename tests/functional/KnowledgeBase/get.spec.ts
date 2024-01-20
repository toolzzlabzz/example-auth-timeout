import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledge base get', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Knowledge_base_get']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when get knowledgeBase', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/633e9e6e-d386-417d-916c-c4b0b17ae30b/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when no get knowledgebase', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/633e9e6e-d386-417d-916c-c4b0b17ae31b/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when knowledgebaseId not is a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/12345/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
