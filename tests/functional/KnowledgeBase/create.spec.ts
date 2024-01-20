import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KnowledgeBase create', (group) => {
  group.tap((test) => test.tags(['@KnowledgeBase_create']))
  const token = Env.get('TEST_TOKEN')
  let knowledgebase
  let unity

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

  test('should return 422 when no name provide', async ({ client }) => {
    const payload = {
      kbDescription: 'Sample description',
      kbIconImg: 'Sample icon',
      kbContentSourceId: 1,
      kbFilesStorageId: 1,
      unityId: '7d251445-36cd-43b4-94a9-b44694a3e1eb',
    }
    const response = await client
      .post('api/v1/knowledge/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)
    response.assertStatus(422)
  })

  test('should return 200 when get knowledgeBase', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when no get knowledgebase', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/633e9e6e-d386-417d-916c-c4b0b17ae31b')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when knowledgebaseId not is a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 201 when duplicate knowledgeBase', async ({ client }) => {
    const response = await client
      .post('api/v1/knowledge/duplicate')
      .header('Authorization', 'Bearer ' + token)
      .json({
        kbId: '' + knowledgebase.id,
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

  test('should return 200 when edit knowledgeBase', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + knowledgebase.id,
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
      .put('api/v1/knowledge/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + knowledgebase.id,
        name: 123,
        description: 'Base de teste 1',
        iconImg: 'https://exemplo.com/imagem.jpg',
        contentSourceId: 1,
        filesStorageId: 1,
      })
      .send()
    response.assertStatus(422)
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
