import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledge base update', (group) => {
  // Write your test here

  const token = Env.get('TEST_TOKEN')

  group.tap((test) => test.tags(['@Knowledge_base_update']))

  test('should return 200 when edit knowledgeBase', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/23d2fc6f-fa2b-448f-8584-0cbfe20b2e24')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '23d2fc6f-fa2b-448f-8584-0cbfe20b2e24',
        name: 'testeFuncional',
        description: 'Base de teste 1',
        iconImg: 'https://exemplo.com/imagem.jpg',
        contentSourceId: 1,
        filesStorageId: 1,
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 422 when no id provide', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/:id')
      .header('Authorization', 'Bearer ' + token)
      .json({
        name: 'testeFuncional',
        description: 'Base de teste 1',
        iconImg: 'https://exemplo.com/imagem.jpg',
        contentSourceId: 1,
        filesStorageId: 1,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 404 when no get knowledgebase to edit', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/23d2fc6f-fa2b-448f-8584-0cbfe20b2e29')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '23d2fc6f-fa2b-448f-8584-0cbfe20b2e29',
        name: 'testeFuncional',
        description: 'Base de teste 1',
        iconImg: 'https://exemplo.com/imagem.jpg',
        contentSourceId: 1,
        filesStorageId: 1,
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when edit name is not a string', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/23d2fc6f-fa2b-448f-8584-0cbfe20b2e24')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '23d2fc6f-fa2b-448f-8584-0cbfe20b2e24',
        name: 123,
        description: 'Base de teste 1',
        iconImg: 'https://exemplo.com/imagem.jpg',
        contentSourceId: 1,
        filesStorageId: 1,
      })
      .send()
    response.assertStatus(422)
  })
})
