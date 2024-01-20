import Env from '@ioc:Adonis/Core/Env'
import { test } from '@japa/runner'

test.group('GenAIModel', (group) => {
  // Write your test here

  group.tap((test) => test.tags(['@GenAIModel']))
  const token = Env.get('TEST_TOKEN')

  let genAI
  let genAIModel

  test('should return 200 when create genAI', async ({ client }) => {
    const payload = {
      name: 'OpenAI',
    }
    const response = await client
      .post('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    genAI = response.body()

    response.assertStatus(200)
  })

  test('should return 200 when create genAIModel', async ({ client }) => {
    const payload = {
      name: 'gpt-3.5-turbo',
      genAIId: '' + genAI.id,
    }
    const response = await client
      .post('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    genAIModel = response.body()

    response.assertStatus(200)
  })

  test('should return 422 when no name provide', async ({ client }) => {
    const payload = {
      name: '',
      genAIId: '' + genAI.id,
    }
    const response = await client
      .post('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .form(payload)

    response.assertStatus(422)
  })

  test('should return 200 when get genAIModel', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/genAIModel/' + genAIModel.id)
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(200)
  })

  test('should return 404 when no get genAIModel', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/genAIModel/633e9e6e-d386-417d-916c-c4b0b17ae31b')
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(404)
  })

  test('should return 422 when no genAIModelId provide', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/genAIModel/:id')
      .header('Authorization', 'Bearer ' + token)

    response.assertStatus(422)
  })

  test('should return 200 when edit genAIModel', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + genAIModel.id,
        name: 'gpt-3',
      })
      .send()
    response.assertStatus(200)
  })

  test('should return 404 when no edit genAIModel', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '633e9e6e-d386-417d-916c-c4b0b17ae31b',
        name: 'gpt-3',
      })
      .send()
    response.assertStatus(404)
  })

  test('should return 422 when no name provide to edit genAI', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '' + genAIModel.id,
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 422 when genAIId is not a valid uui', async ({ client }) => {
    const response = await client
      .put('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .json({
        id: '12345',
        name: 'gpt-3',
      })
      .send()
    response.assertStatus(422)
  })

  test('should return 200 when index genAIModel', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/genAIModel/genAI/' + genAI.id)
      .header('Authorization', 'Bearer ' + token)

      .send()
    response.assertStatus(200)
  })

  test('should return 404 when no index genAIModel', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/genAIModel/genAI/633e9e6e-d386-417d-916c-c4b0b17ae31b')
      .header('Authorization', 'Bearer ' + token)

      .send()
    response.assertStatus(404)
  })

  test('should return 422 when index genAIModelId is not a uuid', async ({ client }) => {
    const response = await client
      .get('api/v1/genAI/genAIModel/genAI/12345')
      .header('Authorization', 'Bearer ' + token)

      .send()
    response.assertStatus(422)
  })

  test('should return 422 when delete genAIModelId not provide', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/genAIModel')
      .header('Authorization', 'Bearer ' + token)
      .form({})
    response.assertStatus(422)
  })

  test('should return 404 when delete genAIModel not found', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '633e9e6e-d386-417d-916c-c4b0b17ae31b' })
    response.assertStatus(404)
  })

  test('should return 200 when delete genAIModel', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/genAIModel/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + genAIModel.id })
    response.assertStatus(200)
  })

  test('should return 200 when delete genAI', async ({ client }) => {
    const response = await client
      .delete('api/v1/genAI/')
      .header('Authorization', 'Bearer ' + token)
      .form({ id: '' + genAI.id })
    response.assertStatus(200)
  })
})
