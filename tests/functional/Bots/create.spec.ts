import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Bots create', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@Bots_create']))
  const token = Env.get('TEST_TOKEN')

  let knowledgebase
  let unity
  let folder
  let genAI
  let genAIModel
  let bot

  test('should return 201 when create unity', async ({ client }) => {
    const payload = {
      name: 'Unidade 2',
    }
    const response = await client
      .post('api/v1/unity/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    unity = response.body()

    response.assertStatus(201)
  })

  test('should return 201 when create knowledgeBase', async ({ client }) => {
    const payload = {
      name: 'Sample KnowledgeBase',
      description: 'Sample description',
      kbIconImg: 'Sample icon',
      kbContentSourceId: 1,
      kbFilesStorageId: 1,
      unityId: '' + unity.id,
    }
    const response = await client
      .post('api/v1/knowledge/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    knowledgebase = response.body()

    response.assertStatus(201)
  })

  test('should return 200 when create KbFolder', async ({ client }) => {
    const payload = {
      name: 'Pasta kbFolder',
      knowledgebaseId: '' + knowledgebase.id,
    }
    const response = await client
      .post('api/v1/knowledge/folder/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    folder = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when create genAI', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
    }
    const response = await client
      .post('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    genAI = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when create genAIModel', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
      genAIId: '' + genAI.id,
    }
    const response = await client
      .post('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    genAIModel = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when create Bots', async ({ client }) => {
    const payload = {
      name: 'Bot Example',
      description: 'This is a test bot',
      tags: 'example,test',
      prompt: 'Hello, how can I assist you?',
      modelId: '' + genAIModel.id,
      genAIKey: 'some-random-key',
      genAIOrganization: 'testOrg',
      folder: [{ id: '' + folder.id }],
    }
    const response = await client
      .post('api/v1/bot/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    bot = response.body()
    console.log(bot)

    response.assertStatus(200)
  })

  test('should return 422 when create Bots without name', async ({ client }) => {
    const payload = {
      description: 'This is a test bot',
      tags: 'example,test',
      prompt: 'Hello, how can I assist you?',
      modelId: '' + genAIModel.id,
      genAIKey: 'some-random-key',
      genAIOrganization: 'testOrg',
      folder: [{ id: '' + folder.id }],
    }
    const response = await client
      .post('api/v1/bot/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 422 when create Bots without modelId', async ({ client }) => {
    const payload = {
      name: 'Bot Example',
      description: 'This is a test bot',
      tags: 'example,test',
      prompt: 'Hello, how can I assist you?',
      genAIKey: 'some-random-key',
      genAIOrganization: 'testOrg',
      folder: [{ id: '' + folder.id }],
    }
    const response = await client
      .post('api/v1/bot/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 422 when create Bots when modelId is not a uuid', async ({ client }) => {
    const payload = {
      name: 'Bot Example',
      description: 'This is a test bot',
      tags: 'example,test',
      prompt: 'Hello, how can I assist you?',
      modelId: '12345',
      genAIKey: 'some-random-key',
      genAIOrganization: 'testOrg',
      folder: [{ id: '' + folder.id }],
    }
    const response = await client
      .post('api/v1/bot/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 422 when create Bots when folderId is not a uuid', async ({ client }) => {
    const payload = {
      name: 'Bot Example',
      description: 'This is a test bot',
      tags: 'example,test',
      prompt: 'Hello, how can I assist you?',
      modelId: '' + genAIModel.id,
      genAIKey: 'some-random-key',
      genAIOrganization: 'testOrg',
      folder: [{ id: '12345' }],
    }
    const response = await client
      .post('api/v1/bot/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 200 when bot exists', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200) //aqqqqqqqqqqqqqqqqq
  })

  test('should return 404 when bot does not exist', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client.get('api/v1/bot/12345').header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 200 when updating a bot with valid id', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + bot.id,
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: '' + genAIModel,
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: '' + folder.id }],
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
        modelId: '' + genAIModel,
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: '' + folder.id }],
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

  test('should return 200 when duplicate a bot', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + bot.id,
      })
    response.assertStatus(200)
  })

  test('should return 422 when no bot id is provided', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 404 when no get bot id', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '7e2f4322-5e74-4e99-b0c6-31f727edcd40',
      })
    response.assertStatus(404)
  })

  test('should return 422 when duplicate a bot with invalid UUID', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '12345',
      })
    response.assertStatus(422)
  })

  test('should return 200 when bots are found for the creator', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/' + bot.userId)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when no bots are found for the creator', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/442a9e56-2c03-4597-96f5-7f976bc14850')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when userId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 422 when userId is not provided', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/:userId')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 404 when botId not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(404)
  })

  test('should return 422 when botId is not a valid UUID', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/12345')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '12345' })
    response.assertStatus(422)
  })

  test('should return 200 when delete bot', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + bot.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete genAIModel', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + genAIModel.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete genAI', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + genAI.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete KbFolder base', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/folder/' + folder.id)
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + folder.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete knowledge base', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/')
      .header('Authorization', 'Bearer ' + token)
      .form({ kbId: '' + knowledgebase.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete unity', async ({ client }) => {
    const response = await client
      .delete('api/v1/unity/' + unity.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })
})
