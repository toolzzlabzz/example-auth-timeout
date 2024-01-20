import { test } from '@japa/runner'

test.group('Bots', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@Bots']))

  let genAI
  let genAIModel
  let bot
  let knowledgebase
  let unity
  let folder
  let login
  let institution
  let auth
  let altInstitution
  let altAuth

  const subdomain = 'nimbus'
  const altSubdomain = 'b3'

  test('should return 200 when get institution', async ({ client }) => {
    const response = await client.get('api/v1/institution/' + subdomain)

    institution = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when get alternative institution', async ({ client }) => {
    const response = await client.get('api/v1/institution/' + altSubdomain)

    altInstitution = response.body()

    response.assertStatus(200)
  })
  const email = `testuser${Math.random()}@example.com`
  test('should return 200 when user registration is successful', async ({ client }) => {
    const payload = {
      name: 'Test User',
      email: email,
      password: 'ValidPassword1!',
      password_confirmation: 'ValidPassword1!',
      institutionId: institution.id,
    }

    const response = await client.post('/api/v1/auth/register').form(payload)

    auth = response.body()

    response.assertStatus(201)
  })
  // const emailAlt = `testuser${Math.random()}@example.com`
  test('should return 200 when make an user authetntication signup with success', async ({
    client,
  }) => {
    const payload = {
      email: email,
      password: 'ValidPassword1!',
      //      tenant: 1,
    }
    const response = await client
      .post('api/v1/auth/login')
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    login = response.body()
    console.log(login, 77777)

    response.assertStatus(200)
  })

  const altEmail = `testuser${Math.random()}@example.com`
  test('should return 200 when user alternative registration is successful', async ({ client }) => {
    const payload = {
      name: 'Test User',
      email: altEmail,
      password: 'ValidPassword1!',
      password_confirmation: 'ValidPassword1!',
      institutionId: altInstitution.id,
    }

    const response = await client.post('/api/v1/auth/register').form(payload)
    console.log(response.body())

    altAuth = response.body()
    response.assertStatus(201)
  })

  test('should return 201 when create unity', async ({ client }) => {
    const payload = {
      name: 'Unidade 2',
    }
    const response = await client
      .post('api/v1/unity/')
      .header('Authorization', 'Bearer ' + auth.token)
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
      .header('Authorization', 'Bearer ' + auth.token)
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
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    folder = response.body()

    response.assertStatus(200)
  })
  test('should return 200 when create genAI', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
    }
    const response = await client.post('api/v1/genAI/').form(payload)

    genAI = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when create genAIModel', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
      genAIId: '' + genAI.id,
    }
    const response = await client.post('api/v1/genAI/genAIModel/').form(payload)

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
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    bot = response.body()
    console.log(bot, 1111111111)

    response.assertStatus(200)
  })

  // test('should return 403 when create Bots with other institution', async ({ client }) => {
  //   const payload = {
  //     name: 'Bot Example',
  //     description: 'This is a test bot',
  //     tags: 'example,test',
  //     prompt: 'Hello, how can I assist you?',
  //     modelId: '' + genAIModel.id,
  //     genAIKey: 'some-random-key',
  //     genAIOrganization: 'testOrg',
  //     folder: [{ id: folder.id }],
  //   }
  //   const response = await client
  //     .post('api/v1/bot/')
  //     .header('Authorization', 'Bearer ' + altAuth.token)
  //     .form(payload)

  //   response.assertStatus(403)
  // })

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
      .header('Authorization', 'Bearer ' + auth.token)
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
      .header('Authorization', 'Bearer ' + auth.token)
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
      .header('Authorization', 'Bearer ' + auth.token)
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
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 200 when bot exists', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(200)
  })

  test('should return 403 when bot exists with other institution', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + altAuth.token)
    response.assertStatus(403)
  })

  test('should return 404 when bot does not exist', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/12345')
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(422)
  })

  test('should return 200 when updating a bot with valid id', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + auth.token)
      .json({
        id: '' + bot.id,
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: genAIModel.id,
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: '' + folder.id }],
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 403 when updating a bot with other institution', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + altAuth.token)
      .json({
        id: '' + bot.id,
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: genAIModel.id,
        genAIKey: 'updatedGenAIKey',
        genAIOrganization: 'updatedGenAIOrg',
        folder: [{ id: '' + folder.id }],
      })
      .send()
    response.assertStatus(403)
  })

  test('should return 422 when updating a bot with invalid UUID', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/12345')
      .header('Authorization', 'Bearer ' + auth.token)
      .json({
        id: '12345',
        name: 'Updated Bot Name',
        description: 'Updated description here',
        tags: 'updated,bot,tags',
        prompt: 'Updated prompt for the bot',
        modelId: '' + genAIModel.id,
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
      .header('Authorization', 'Bearer ' + auth.token)
      .json({})
      .send()
    response.assertStatus(422)
  })

  test('should return 404 when trying to update a non-existing bot', async ({ client }) => {
    const response = await client
      .put('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + auth.token)
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
      .header('Authorization', 'Bearer ' + auth.token)
      .json({
        id: '' + bot.id,
      })
    response.assertStatus(200)
  })

  test('should return 403 when duplicate a bot with other institution', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + altAuth.token)
      .json({
        id: bot.id,
      })
    response.assertStatus(403)
  })

  test('should return 422 when no bot id is provided', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(422)
  })

  test('should return 404 when no get bot id', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + auth.token)
      .json({
        id: '7e2f4322-5e74-4e99-b0c6-31f727edcd40',
      })
    response.assertStatus(404)
  })

  test('should return 422 when duplicate a bot with invalid UUID', async ({ client }) => {
    const response = await client
      .post('api/v1/bot/duplicate/')
      .header('Authorization', 'Bearer ' + auth.token)
      .json({
        id: '12345',
      })
    response.assertStatus(422)
  })

  test('should return 200 when bots are found for the creator', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/' + login.user.id)
      .header('Authorization', 'Bearer ' + auth.token)
    console.log(bot.id, 5555555)

    response.assertStatus(200)
  })

  test('should return 403 when bots are found for the creator with other institution', async ({
    client,
  }) => {
    const response = await client
      .get('api/v1/bot/user/' + login.user.id)
      .header('Authorization', 'Bearer ' + altAuth.token)
    response.assertStatus(403)
  })

  test('should return 404 when no bots are found for the creator', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/442a9e56-2c03-4597-96f5-7f976bc14850')
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(404)
  })

  test('should return 422 when userId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/12345')
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(422)
  })

  test('should return 422 when userId is not provided', async ({ client }) => {
    const response = await client
      .get('api/v1/bot/user/:userId')
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(422)
  })

  test('should return 404 when botId not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + auth.token)

    response.assertStatus(404)
  })

  test('should return 422 when botId is not a valid UUID', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/12345')
      .header('Authorization', 'Bearer ' + auth.token)
      .form({ id: '12345' })
    response.assertStatus(422)
  })

  test('should return 403 when delete bot with other institution', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + altAuth.token)
      .form({ id: '' + bot.id })
    response.assertStatus(403)
  })

  test('should return 200 when delete bot', async ({ client }) => {
    const response = await client
      .delete('api/v1/bot/' + bot.id)
      .header('Authorization', 'Bearer ' + auth.token)
      .form({ id: '' + bot.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete genAIModel', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/genAIModel/')
      .form({ id: '' + genAIModel.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete genAI', async ({ client }) => {
    const response = await client.delete('api/v1/genAI/').form({ id: '' + genAI.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete KbFolder base', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/folder/' + folder.id)
      .header('Authorization', 'Bearer ' + auth.token)
      .form({ id: '' + folder.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete knowledge base', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + auth.token)

    response.assertStatus(200)
  })

  test('should return 200 when delete unity', async ({ client }) => {
    const response = await client
      .delete('api/v1/unity/' + unity.id)
      .header('Authorization', 'Bearer ' + auth.token)
    response.assertStatus(200)
  })
})
