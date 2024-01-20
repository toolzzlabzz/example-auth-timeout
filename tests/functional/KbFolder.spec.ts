import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KbFolder', (group) => {
  group.tap((test) => test.tags(['@KbFolder']))

  const token = Env.get('TEST_TOKEN')
  let knowledgebase
  let unity
  let folder

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

  test('should return 422 when no name provide', async ({ client }) => {
    const payload = {
      knowledgebaseId: '' + folder.id,
    }
    const response = await client
      .post('api/v1/knowledge/folder/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)
    response.assertStatus(422)
  })

  test('should return 422 when no KnowledgebaseId provide', async ({ client }) => {
    const payload = {
      name: 'Pasta kbFolder',
    }
    const response = await client
      .post('api/v1/knowledge/folder/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)
    response.assertStatus(422)
  })
  test('should return 422 when no KnowledgebaseId is not a uuid', async ({ client }) => {
    const payload = {
      name: 'Pasta kbFolder',
      knowledgebaseId: 'abcd1234',
    }
    const response = await client
      .post('api/v1/knowledge/folder/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)
    response.assertStatus(422)
  })
  test('should return 422 when no KnowledgebaseId is not a string', async ({ client }) => {
    const payload = {
      name: 'Pasta kbFolder',
      knowledgebaseId: 123456,
    }
    const response = await client
      .post('api/v1/knowledge/folder/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)
    response.assertStatus(422)
  })

  test('should return 200 when get KbFolder', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/' + folder.id)
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(200)
  })

  test('should return 404 when KbFolder no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/ffcad24e-0e93-4eed-aaa6-8bc89cdbdc80')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 200 when index KbFolder', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/knowledge/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when knowledgebase no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/knowledge/8a9ae744-e7cc-4489-8130-3787cd8f26a4')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when knowledgeId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/folder/knowledge/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 200 when edit KbFolder', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/folder/' + folder.id)
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + folder.id,
        name: 'pasta teste alterada',
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 422 when no id provide', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/folder/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        name: 'pasta teste alterada',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 404 when no get KbFolder to edit', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/folder/ffcad24e-0e93-4eed-aaa6-8bc89cdbdc80')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc80',
        name: 'pasta teste alterada',
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when edit KbFolder is not a valid uuid', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/folder/1234')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: 1234,
        name: 'pasta teste alterada',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 404 when id not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/folder/791cfe6b-f849-4d84-9325-aa16aae19621')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '791cfe6b-f849-4d84-9325-aa16aae19621' })
    response.assertStatus(404)
  })

  test('should return 422 when id not uuid', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/folder/1234')
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(422)
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
      .delete('api/v1/knowledge/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(200)
  })

  test('should return 200 when delete unity', async ({ client }) => {
    const response = await client
      .delete('api/v1/unity/' + unity.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })
})
