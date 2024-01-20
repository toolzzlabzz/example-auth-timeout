import { test } from '@japa/runner'

test.group('Chat folder get', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Chat_folder_get']))
  test('should return 200 when get chatFolder', async ({ client }) => {
    const response = await client.get('api/v1/chatfolder/get')
    response.assertStatus(200)
  })
  test('should return 422 when unityId not is a number', async ({ client }) => {
    const response = await client.get('api/v1/chatfolder/get/string')
    response.assertStatus(422)
  })

  test('should return 404 when no get unity', async ({ client }) => {
    const response = await client.get('api/v1/chatfolder/get/9999')
    response.assertStatus(404)
  })

  test('should return 404 without unityId when get chatFolder', async ({ client }) => {
    const response = await client.get('api/v1/chatfolder/get/')
    response.assertStatus(404)
  })
})
