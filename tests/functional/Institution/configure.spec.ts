import { test } from '@japa/runner'

test.group('Institution configure', () => {
  test('should return 200 when edit institution', async ({ client }) => {
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
    const response =  await client.put('api/v1/institution/configureInstitution').form(payload)
    response.assertStatus(200) 
  }) 

  test('should return 422 when no institutionId provide', async ({ client }) => {

    const payload = {

        name: 'Sample Institution',
        cnpj: '12345678901234',
        description: 'Sample description',
        aiDefaultModel: 'model_id_123',
        apiKey: 'api_key_123',
        googleApiKey: 'google_api_key_123',
        googleCSEId: 'google_cse_id_123', 

    }

    const response =  await client.put('api/v1/institution/configureInstitution').form(payload)
    response.assertStatus(422) 
  }) 


  test('should return 404 when no get institution', async ({ client }) => {
    const payload = {

        institutionId: 564545, //invalid
        name: 'Sample Institution',
        cnpj: '12345678901234',
        description: 'Sample description',
        aiDefaultModel: 'model_id_123',
        apiKey: 'api_key_123',
        googleApiKey: 'google_api_key_123',
        googleCSEId: 'google_cse_id_123',

    }
    const response =  await client.put('api/v1/institution/configureInstitution').form(payload)
    response.assertStatus(404) 
  }) 

  
  test('should return 422 when institutionId is not a number', async ({ client }) => {
    const payload = {

        institutionId: 'invalid_institution_id', // Invalid value for institutionId
        name: 'Sample Institution',
        cnpj: '12345678901234',
        description: 'Sample description',
        aiDefaultModel: 'model_id_123',
        apiKey: 'api_key_123',
        googleApiKey: 'google_api_key_123',
        googleCSEId: 'google_cse_id_123',

    }

    const response = await client.put('api/v1/institution/configureInstitution').form(payload)
    response.assertStatus(422)
  })


  
})
