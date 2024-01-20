import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Knowledgebase file create', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Knowledgebase_file_create']))

  const token = Env.get('TEST_TOKEN')

  let knowledgebase
  let unity
  let folder
  let file

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

  test('should return 200 when create KnowledgebaseFile', async ({ client }) => {
    const payload = {
      fileName: 'Valid File Name',
      internalStorageUrl: 'http://valid.url/internal',
      url: 'http://valid.url',
      maskName: 'Valid Mask Name',
      folderId: '' + folder.id,
      file: {
        size: 1024,
        extname: 'pdf',
      },
    }
    const response = await client
      .post('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    file = response.body()

    response.assertStatus(200)
  })

  // test('should return 200 when upload KnowledgebaseFile', async ({ client }) => {
  //   const testFilePath = '/tests/functional/testfile.txt'
  //   const payload = {
  //     file: {
  //       type: 'file',
  //       filename: 'testfile.txt',
  //       name: 'file',
  //     },
  //     content: testFilePath,
  //   }
  //   const response = await client
  //     .post(`api/v1/knowledge/upload/${knowledgebase}/${folder}`)
  //     .header('Authorization', 'Bearer ' + token)
  //     .form(payload)

  //   file = response.body()

  //   response.assertStatus(200)
  // })

  test('should return 422 when required fields are missing', async ({ client }) => {
    const payload = {}
    const response = await client
      .post('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 422 when folderId is not a valid UUID', async ({ client }) => {
    const payload = {
      fileName: 'Valid File Name',
      internalStorageUrl: 'http://valid.url/internal',
      url: 'http://valid.url',
      maskName: 'Valid Mask Name',
      folderId: 'invalid-uuid',
    }
    const response = await client
      .post('api/v1/knowledge/file/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 200 when get KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .get(`api/v1/knowledge/file/${file.id}/show`)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when KnowledgebaseFile no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/1235cd5a-74c0-4469-8cfb-0e5417f691d9/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when id is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/1234444/show')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 200 when edit KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + file.id,
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 404 when no get KnowledgebaseFile to edit', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '1235cd5a-74c0-4469-8cfb-0e5417f691d8',
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when editing KnowledgebaseFile without id', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when edit knowledgebaseFileId is not a string', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/file/update/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: 123,
        maskName: 'Valid Mask Name',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 200 when get KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/' + folder.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when folderId no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/f24ff413-98e7-4cde-88de-f583880aaed9')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when folderId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/123444')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 422 when folderId is not a string', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/folderId/string')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 200 when get KnowledgebaseFile', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/' + knowledgebase.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when knowledgebaseId no exists', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/5a4f8a8d-cdc6-4c3c-8e3e-b57f4868d576')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when knowledgebaseId is not a valid uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/123444')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 422 when knowledgebaseId is not a string', async ({ client }) => {
    const response = await client
      .get('api/v1/knowledge/file/knowledgebase/string')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

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
