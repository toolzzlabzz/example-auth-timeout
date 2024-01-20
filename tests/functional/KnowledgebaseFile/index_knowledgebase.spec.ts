import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledgebase file index knowledgebase', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Knowledgebase_file_index_knowledgebase']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when get KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/5a4f8a8d-cdc6-4c3c-8e3e-b57f4868d570')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when knowledgebaseId no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/5a4f8a8d-cdc6-4c3c-8e3e-b57f4868d576')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when knowledgebaseId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/123444')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 422 when knowledgebaseId is not a string', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/string')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
