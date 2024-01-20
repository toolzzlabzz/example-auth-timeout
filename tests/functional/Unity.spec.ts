import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Unity', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@Unity']))
  const token = Env.get('TEST_TOKEN')

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

  test('should return 422 when create unity without name', async ({ client }) => {
    const payload = {}
    const response = await client
      .post('api/v1/unity/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 200 when unity exists', async ({ client }) => {
    const response = await client
      .get('api/v1/unity/' + unity.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })

  test('should return 404 when unity does not exist', async ({ client }) => {
    const response = await client
      .get('api/v1/unity/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })
  // test('should return 422 when id is not a valid uuid', async ({ client }) => {
  //   const response = await client
  //     .get('api/v1/unity/123456')
  //     .header('Authorization', 'Bearer ' + token)
  //   response.assertStatus(422)
  // })
  test('should return 200 when edit unity', async ({ client }) => {
    const response = await client
      .put('api/v1/unity/' + unity.id)
      .header('Authorization', 'Bearer ' + token)
      .json({
        name: 'Unidade 2 Edited',
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 404 when no edit unity', async ({ client }) => {
    const response = await client
      .put('api/v1/unity/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)
      .json({
        name: 'Unidade 2 Edited',
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when unityId is not a valid uuid', async ({ client }) => {
    const response = await client
      .put('api/v1/unity/12345')
      .header('Authorization', 'Bearer ' + token)
      .json({
        name: 'Unidade 2 Edited',
      })
      .send()
    response.assertStatus(422)
  })
  test('should return 404 when delete unity not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/unity/7e2f4322-5e74-4e99-b0c6-31f727edcd40')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 422 when delete unityId is not a uuid', async ({ client }) => {
    const response = await client
      .delete('api/v1/unity/12345')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(422)
  })

  test('should return 200 when delete unity', async ({ client }) => {
    const response = await client
      .delete('api/v1/unity/' + unity.id)
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(200)
  })
})
