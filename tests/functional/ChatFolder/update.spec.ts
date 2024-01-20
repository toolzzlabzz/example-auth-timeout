import { test } from '@japa/runner'

test.group('Chat folder update', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Chat_folder_update']))
  test('should return 200 when edit chatFolder', async ({ client }) => {
    const response = await client
      .put('api/v1/chatfolder/update')
      .json({
        unityId: 1,
        folderName: 'testeFuncional',
        profileId: 1,
      })
      .send()
    response.assertStatus(200)
  })
  test('should return 422 when no unity id provide', async ({ client }) => {
    const response = await client
      .put('api/v1/chatfolder/update')
      .json({
        folderName: 'testeFuncional',
        profileId: 1,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when edit chatFolder is not a number', async ({ client }) => {
    const response = await client
      .put('api/v1/chatfolder/update')
      .json({
        unityId: 'id_string',
        folderName: 'testeFuncional',
        profileId: 1,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 404 when no edit chatFolder', async ({ client }) => {
    const response = await client
      .put('api/v1/chatfolder/update')
      .json({
        unityId: 999999,
        folderName: 'testeFuncional',
        profileId: 1,
      })
      .send()
    response.assertStatus(404)
  })
  test('should return 422 when no profileId provide', async ({ client }) => {
    const response = await client
      .put('api/v1/chatfolder/update')
      .json({
        unityId: 1,
        folderName: 'testeFuncional',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when no folderName provide', async ({ client }) => {
    const response = await client
      .put('api/v1/chatfolder/update')
      .json({
        unityId: 1,
        profileId: 1,
      })
      .send()
    response.assertStatus(422)
  })
})
