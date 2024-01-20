import { test } from '@japa/runner'
test.group('Register Scenario', () => {

    const email = `testuser${Math.random()}@example.com`
    test('should return 200 when user registration is successful', async ({ client, assert }) => {
        const payload = {
            name: 'Test User',
            email: email,
            password: 'ValidPassword1!',
            password_confirmation: 'ValidPassword1!'
        }
        const response = await client.post('/api/v1/auth/register').form(payload)
        response.assertStatus(200)
    })

    test('should return 400 when email is already in use', async ({ client }) => {
        const payload = {
            name: 'Test User',
            email: email,
            password: 'ValidPassword1!',
            password_confirmation: 'ValidPassword1!'
        }
        const response = await client.post('/api/v1/auth/register').form(payload)
        response.assertStatus(400)

    })

    test('should return 422 when required field is missing', async ({ client }) => {
        const payload = {
            name: 'Test User',
            password: 'ValidPassword1!',
        }
        const response = await client.post('/api/v1/auth/register').form(payload)
        response.assertStatus(422)
    })

    test('should return 422 when password does not meet requirements', async ({ client }) => {
        const payload = {
            name: 'Test User',
            email: email,
            password: 'short',
        }
        const response = await client.post('/api/v1/auth/register').form(payload)
        response.assertStatus(422)
    })
})