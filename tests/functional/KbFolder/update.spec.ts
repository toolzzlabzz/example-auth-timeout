import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KbFolder update', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@KbFolder_update']))

  const token = Env.get('TEST_TOKEN')

  test('should return 200 when edit KbFolder', async ({ client }) => {
    const response = await client
      .put('api/v1/knowledge/folder/ffcad24e-0e93-4eed-aaa6-8bc89cdbdc81')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: 'ffcad24e-0e93-4eed-aaa6-8bc89cdbdc81',
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
        id: 'api/v1/knowledge/folder/ffcad24e-0e93-4eed-aaa6-8bc89cdbdc80',
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
})
