import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledgebase file update', (group) => {
  // Write your test here
  const token = Env.get('TEST_TOKEN')

  group.tap((test) => test.tags(['@Knowledgebase_file_update']))
  test('should return 200 when edit KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '1235cd5a-74c0-4469-8cfb-0e5417f691d0',
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 404 when no get KnowledgebaseFile to edit', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '1235cd5a-74c0-4469-8cfb-0e5417f691d8',
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when editing KnowledgebaseFile without id', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when edit knowledgebaseFileId is not a string', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: 123,
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(422)
  })
})
