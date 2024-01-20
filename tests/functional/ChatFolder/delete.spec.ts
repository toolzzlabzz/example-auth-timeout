import { test } from '@japa/runner'

test.group('Chat folder delete', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Chat_folder_delete']))
  test('should return 200 when delete chatFolder', async ({ client }) => {
    const response = await client.delete('api/v1/chatfolder/delete/1')
    response.assertStatus(200)
  })
  test('should return 422 when no unityId', async ({ client }) => {
    const response = await client.delete('api/v1/chatfolder/delete/')
    response.assertStatus(422)
  })
})
