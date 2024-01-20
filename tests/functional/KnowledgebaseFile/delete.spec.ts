import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledgebase file delete', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Knowledgebase_file_delete']))

  const token = Env.get('TEST_TOKEN')

  test('should return 422 when id is missing', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form({})
    response.assertStatus(422)
  })

  test('should return 422 when id is not a uuid', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: 'invalid-uuid' })
    response.assertStatus(422)
  })

  test('should return 404 when knowledgeFile base not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '78aa2fd1-82d6-4172-92cd-c04f037939a9' })
    response.assertStatus(404)
  })

  test('should return 200 when delete KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '8cd38175-b011-4fca-81e9-d6a440b2807e' })
    response.assertStatus(200)
  })
})
