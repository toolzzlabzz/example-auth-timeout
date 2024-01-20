import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledgebase file index folder', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Knowledgebase_file_index_folder']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when get KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/f24ff413-98e7-4cde-88de-f583880aaed3')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when folderId no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/f24ff413-98e7-4cde-88de-f583880aaed9')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when folderId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/123444')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 422 when folderId is not a string', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/string')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
