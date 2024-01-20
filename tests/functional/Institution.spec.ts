import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('Institution', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@Institution']))
  const token = Env.get('TEST_TOKEN')
  const subdomain = 'nimbus'

  test('should return 200 when get institution', async ({ client }) => {
    const response = await client
      .get('api/v1/institution/' + subdomain)
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(200)
  })

  test('should return 404 when no get institution', async ({ client }) => {
    const response = await client
      .get('api/v1/institution/')
      .header('Authorization', 'Bearer ' + token)
    response.assertStatus(404)
  })

  test('should return 200 when updating a institution with valid id', async ({ client }) => {
    const response = await client
      .put('api/v1/institution/configure/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        institutionId: '1',
      })
      .send()
    response.assertStatus(200)
  })

  // test('should return 404 when trying to update a non-existing institution', async ({ client }) => {
  //   const response = await client
  //     .put('api/v1/institution/configure/')
  //     .header('Authorization', 'Bearer ' + token)
  //     .json({
  //       institutionId: '26d9a411-1df1-42d7-91b6-5fd729ae7dd0',
  //     })
  //     .send()
  //   response.assertStatus(404)
  // })

  test('should return 422 when trying to update a institution whitout institutionId', async ({
    client,
  }) => {
    const response = await client
      .put('api/v1/institution/configure/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        institutionId: '',
      })
      .send()
    response.assertStatus(422)
  })
})
