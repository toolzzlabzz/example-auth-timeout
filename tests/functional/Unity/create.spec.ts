import { test } from '@japa/runner'

test.group('Unity create', () => {
  test('should return 201 when create unity', async ({ client }) => {
    const payload = {
      institutionId: 1,
      unityUuid: 'sample-uuid',
      aiDefaultModel: 'gpt-3',
      chatStyle: 'casual',
      primaryColorHex: '#FFFFFF', 
      secondaryColorHex: '#000000',
      lightModeLogoUrl: 'https://example.com/light-logo.png',
      lightModeAltLogoUrl: 'https://example.com/light-alt-logo.png',
      darkModeLogoUrl: 'https://example.com/dark-logo.png',
      darkModeAltLogoUrl: 'https://example.com/dark-alt-logo.png',
      faviconUrl: 'https://example.com/favicon.ico',
      theme: 'light',
    }
 
    const response = await client.post('api/v1/unity/create').form(payload)
    response.assertStatus(200)
  })

  test('should return 422 when no institutionId provided', async ({ client }) => {
    const payload = {
      unityUuid: 'sample-uuid',
      aiDefaultModel: 'gpt-3',
      chatStyle: 'casual',
      primaryColorHex: '#FFFFFF',
      secondaryColorHex: '#000000',
      lightModeLogoUrl: 'https://example.com/light-logo.png',
      lightModeAltLogoUrl: 'https://example.com/light-alt-logo.png',
      darkModeLogoUrl: 'https://example.com/dark-logo.png',
      darkModeAltLogoUrl: 'https://example.com/dark-alt-logo.png',
      faviconUrl: 'https://example.com/favicon.ico',
      theme: 'light',
    }

    const response = await client.post('api/v1/unity/create').form(payload)
    response.assertStatus(422)
  })

  test('should return 400 when institutionId is not a number', async ({ client }) => {
    const payload = {
      institutionId: 'invalid_institution_id', // Invalid value for institutionId
      unityUuid: 'sample-uuid',
      aiDefaultModel: 'gpt-3',
      chatStyle: 'casual',
      primaryColorHex: '#FFFFFF',
      secondaryColorHex: '#000000',
      lightModeLogoUrl: 'https://example.com/light-logo.png',
      lightModeAltLogoUrl: 'https://example.com/light-alt-logo.png',
      darkModeLogoUrl: 'https://example.com/dark-logo.png',
      darkModeAltLogoUrl: 'https://example.com/dark-alt-logo.png',
      faviconUrl: 'https://example.com/favicon.ico',
      theme: 'light',
    }

    const response = await client.post('api/v1/unity/create').form(payload)
    response.assertStatus(422)
  })

})