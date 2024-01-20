import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KnowledgeBase delete', (group) => {
  const token = Env.get('TEST_TOKEN')
  group.tap((test) => test.tags(['@KnowledgeBase_delete']))
  test('should return 200 when delete knowledge base', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/')
      .header('Authorization', 'Bearer ' + token)
      .form({ kbId: '633e9e6e-d386-417d-916c-c4b0b17ae30b' })
    response.assertStatus(200)
  })

  test('should return 422 when no kbId provided', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/')
      .header('Authorization', 'Bearer ' + token)
      .form({})
    response.assertStatus(422)
  })

  test('should return 404 when knowledge base not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/')
      .header('Authorization', 'Bearer ' + token)
      .form({ kbId: '633e9e6e-d386-417d-916c-c4b0b17ae31b' }) // assuming 9999 does not exist
    response.assertStatus(404)
  })
})
