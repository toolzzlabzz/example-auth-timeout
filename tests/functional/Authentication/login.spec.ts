import { test } from '@japa/runner'

test.group('Login Scenario', () => {
  test('should return 200 when make an user authetntication signup with success', async ({
    client,
  }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'A12345@a',
      //      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)

    response.assertStatus(200)
  })
  test('should return 422 when required field is missing', async ({ client }) => {
    const payload = {}
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })
  test('should return 401 when password is incorrect', async ({ client }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'wrongpassword',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(401)
  })

  test('should return 401 when email does not exist', async ({ client }) => {
    const payload = {
      email: 'nonexistent@back.com',
      password: 'hasbloodinthewater',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(401)
  })

  test('should return 400 when tenant is not provided', async ({ client }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'hasbloodinthewater',
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(400)
  })
  test('should return 422 when email is not provided', async ({ client }) => {
    const payload = {
      password: 'ValidPassword1!',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })

  test('should return 422 when password is too short', async ({ client }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'Short1!',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })

  test('should return 422 when password is too long', async ({ client }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'ThisPasswordIsWayTooLong1!',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })

  test('should return 422 when password does not contain a special character', async ({
    client,
  }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'NoSpecialChar1',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })

  test('should return 422 when password does not contain an uppercase letter', async ({
    client,
  }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'nouppercase1!',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })

  test('should return 422 when password does not contain a number', async ({ client }) => {
    const payload = {
      email: 'fight@back.com',
      password: 'NoNumber!',
      tenant: 1,
    }
    const response = await client.post('api/v1/auth/login').form(payload)
    response.assertStatus(422)
  })
})
