import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('KbFolder delete', (group) => {
  const token = Env.get('TEST_TOKEN')

  group.tap((test) => test.tags(['@KbFolder_delete']))

  test('should return 200 when delete KbFolder base', async ({ client }) => {
    const response = await client
      .delete('api/v1/knowledge/folder/45c0630d-8672-4b3f-b929-c58f4aa1ea37')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '69ef9df3-e610-4b26-b0ec-c032bbcc4628' })
    response.assertStatus(200)
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
})
