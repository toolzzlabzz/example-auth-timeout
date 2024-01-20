import { test } from '@japa/runner'

test.group('Send Message', () => {
  test('should return 200 when receive message', async ({ client }) => {
    const payload = {
      question: 'Fale sobre empreendedores da favela',
      conversationId: 2,
      role: 'user',
    }
    const response = await client.post('api/v1/chat/send-message').form(payload)
    response.assertStatus(200)
  })

  test('should return 422 when required field is missing', async ({ client }) => {
    const payload = {}
    const response = await client.post('api/v1/chat/send-message').form(payload)
    response.assertStatus(422)
  })
})
