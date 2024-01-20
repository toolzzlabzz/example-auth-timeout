import { test } from '@japa/runner'

test.group('Institution get', (group) => {
  group.tap((test) => test.tags(['@Institution__get']))
  test('should return 200 when get institution', async ({ client }) => {
    const institutionId = 1
    const response = await client.get('api/v1/institution/getInstitution/' + institutionId)
    response.assertStatus(200)
  })

  test('should return 404 when no instition_id provided', async ({ client }) => {
    const institutionId = ''
    const response = await client.get('api/v1/institution/getInstitution/' + institutionId)
    response.assertStatus(404)
  })

  test('should return 404 when no get institution', async ({ client }) => {
    const institutionId = 44444
    const response = await client.get('api/v1/institution/getInstitution/' + institutionId)
    response.assertStatus(404)
  })

  test('should return 422 when institution_id not is a number', async ({ client }) => {
    const institutionId = 'any_institution_string'
    const response = await client.get('api/v1/institution/getInstitution/' + institutionId)
    response.assertStatus(422)
  })
})
