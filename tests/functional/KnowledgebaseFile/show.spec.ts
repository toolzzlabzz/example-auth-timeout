import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledgebase file show', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Knowledgebase_file_show']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when get KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/1235cd5a-74c0-4469-8cfb-0e5417f691d0/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when KnowledgebaseFile no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/1235cd5a-74c0-4469-8cfb-0e5417f691d9/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/1234444/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
