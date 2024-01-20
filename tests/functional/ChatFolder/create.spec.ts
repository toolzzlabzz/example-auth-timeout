import { test } from '@japa/runner'

test.group('Chat folder create', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Chat_folder_create']))
  test('should return 200 when create Chat folder', async ({ client }) => {
    const response = await client
      .post('api/v1/chatfolder/create')
      .json({
        unityId: 1,
        folderName: 'testeFuncional',
        profileId: 1,
      })
      .send()
    response.assertStatus(201)
  })

  test('should return 404 when no create Chat folder', async ({ client }) => {
    const response = await client.post('api/v1/chatfolder/create')
    response.assertStatus(404)
  })

  test('should return 422 when no folderName provide', async ({ client }) => {
    const response = await client
      .post('api/v1/chatfolder/create')
      .json({
        unityId: 1,
        profileId: 1,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when no unityId provide', async ({ client }) => {
    const response = await client
      .post('api/v1/chatfolder/create')
      .json({
        folderName: 'testeFuncional',
        profileId: 1,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when no profileId provide', async ({ client }) => {
    const response = await client
      .post('api/v1/chatfolder/create')
      .json({
        unityId: 1,
        folderName: 'testeFuncional',
      })
      .send()
    response.assertStatus(422)
  })
})
