import { test } from '@japa/runner'

test.group('GenAI', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@GenAI']))

  let genAI
  let institution
  let auth
  let altInstitution
  let altAuth
  const subdomain = 'nimbus'
  const altSubdomain = 'toolzz'

  test('should return 200 when get institution', async ({ client }) => {
    const response = await client.get('api/v1/institution/' + subdomain)

    institution = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when get alternative institution', async ({ client }) => {
    const response = await client.get('api/v1/institution/' + altSubdomain)

    altInstitution = response.body()

    response.assertStatus(200)
  })

  const altEmail = `testuser${Math.random()}@example.com`
  test('should return 200 when user alternative registration is successful', async ({
    client,
    assert,
  }) => {
    const payload = {
      name: 'Test User',
      email: altEmail,
      password: 'ValidPassword1!',
      password_confirmation: 'ValidPassword1!',
      institutionId: altInstitution.id,
    }

    const response = await client.post('/api/v1/auth/register').form(payload)

    auth = response.body()
    response.assertStatus(200)
  })

  const email = `testuser${Math.random()}@example.com`
  test('should return 200 when user registration is successful', async ({ client, assert }) => {
    const payload = {
      name: 'Test User',
      email: email,
      password: 'ValidPassword1!',
      password_confirmation: 'ValidPassword1!',
      institutionId: institution.id,
    }

    const response = await client.post('/api/v1/auth/register').form(payload)

    auth = response.body()
    response.assertStatus(200)
  })

  test('should return 200 when create genAI', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
    }
    const response = await client
      .post('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    genAI = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when create genAI ', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
    }
    const response = await client
      .post('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    genAI = response.body()

    response.assertStatus(200)
  })

  return false

  test('should return 422 when no name provide', async ({ client }) => {
    const payload = {
      name: '',
    }
    const response = await client
      .post('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + auth.token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 200 when get genAI', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/' + genAI.id)
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(200)
  })

  test('should return 404 when no get genAI', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/633e9e6e-d386-417d-916c-c4b0b17ae31b')
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(404)
  })

  test('should return 422 when no genAIId provide', async ({ client }) => {
    const response = await client.get('api/v1/genAI/:id').header('Authorization', 'Bearer ' + token)

    response.assertStatus(422)
  })

  test('should return 200 when edit genAI', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + genAI.id,
        name: 'OpenAI',
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 404 when no edit genAI', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '633e9e6e-d386-417d-916c-c4b0b17ae31b',
        name: 'OpenAI',
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when no name provide to edit genAI', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + genAI.id,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when genAIId is not a valid uui', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '12345',
        name: 'OpenAI',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 200 when index genAI', async ({ client }) => {
    const payload = {
      id: '' + genAI.id,
    }
    const response = await client
      .get('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)
      .send()
    response.assertStatus(200)
  })

  test('should return 422 when delete genAIId not provide', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form({})
    response.assertStatus(422)
  })

  test('should return 404 when delete genAI not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '633e9e6e-d386-417d-916c-c4b0b17ae31b' })
    response.assertStatus(404)
  })

  test('should return 200 when delete genAI', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + genAI.id })
    response.assertStatus(200)
  })
})
