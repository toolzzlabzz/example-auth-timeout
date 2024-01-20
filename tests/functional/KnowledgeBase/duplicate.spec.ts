import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Know ledge base duplicate', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Know_ledge_base_duplicate']))

  const token = Env.get('TEST_TOKEN')

  test('should return 201 when duplicate knowledgeBase', async ({ client }) => {
    const response = await client
      .post('api/v1/knowledge/duplicate')
      .header('Authorization', 'Bearer ' + token)
      .json({
        kbId: '23d2fc6f-fa2b-448f-8584-0cbfe20b2e24',
      })
    response.assertStatus(201)
  })

  test('should return 422 when no knowledgebase id provide', async ({ client }) => {
    const response = await client
      .post('api/v1/knowledge/duplicate')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 404 when no get knowledgeBase id', async ({ client }) => {
    const response = await client
      .post('api/v1/knowledge/duplicate')
      .header('Authorization', 'Bearer ' + token)
      .json({
        kbId: '23d2fc6f-fa2b-448f-8584-0cbfe20b2e29',
      })
    response.assertStatus(404)
  })
})
