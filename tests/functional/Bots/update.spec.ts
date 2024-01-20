import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Bots update', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@Bots_update']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when updating a bot with valid id', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd49')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '7e2f4322-5e74-4e99-b0c6-31f727edcd49',
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc82',
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc83' }],
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 422 when updating a bot with invalid UUID', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/12345')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '12345',
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc82',
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc83' }],
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when updating a bot without required fields', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd49')
      .header('Authorization', 'Bearer ' + token)
      .json({})
      .send()
    response.assertStatus(422)
  })

  test('should return 404 when trying to update a non-existing bot', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '7e2f4322-5e74-4e99-b0c6-31f727edcd40',
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc82',
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc83' }],
      })
      .send()
    response.assertStatus(404)
  })
})
