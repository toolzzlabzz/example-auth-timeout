import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KbFolder index', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@KbFolder_index']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when get KbFolder', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/8a9ae744-e7cc-4489-8130-3787cd8f26a3')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when knowledgebase no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/8a9ae744-e7cc-4489-8130-3787cd8f26a4')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when institutionId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })
})
