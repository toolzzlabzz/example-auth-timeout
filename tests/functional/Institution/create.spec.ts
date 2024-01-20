import { test } from '@japa/runner'
/*
test.group('Institution create', () => {
  test('should return 200 when create institution', async ({ client }) => {
    const payload = {
        institutionId: 1,
        name: 'Sample Institution',
        cnpj: '12345678910',
        description: 'Sample description',
        aiDefaultModel: 'gpt-35',
        apiKey: 'api_key_123',
        googleApiKey: 'google_api_key_123',
        googleCSEId: 'google_cse_id_123',
    }
    const response =  await client.post('api/v1/institution').form(payload)
    response.assertStatus(200) 
  }) 

  test('should return 422 when no institutionId provide', async ({ client }) => {
    const payload = {
        name: 'Sample Institution',
        cnpj: '12345678910',
        description: 'Sample description',
        aiDefaultModel: 'gpt-35',
        apiKey: 'api_key_123',
        googleApiKey: 'google_api_key_123',
        googleCSEId: 'google_cse_id_123',
    }
    const response =  await client.post('api/v1/institution').form(payload)
    response.assertStatus(422) 
  }) 

  test('should return 400 when institutionId is not a number', async ({ client }) => {
    const payload = {
        institutionId: 'invalid_institution_id', 
        name: 'Sample Institution',
        cnpj: '12345678910',
        description: 'Sample description',
        aiDefaultModel: 'gpt-35',
        apiKey: 'api_key_123',
        googleApiKey: 'google_api_key_123',
        googleCSEId: 'google_cse_id_123',
    }
    const response = await client.post('api/v1/institution').form(payload)
    response.assertStatus(400)
  })
})*/