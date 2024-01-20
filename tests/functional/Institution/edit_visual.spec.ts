/*import { test } from '@japa/runner'

test.group('Institution edit visuals', () => {
    test('should return 200 when editing visuals', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000',
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        }

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(200)
    })
    test('should return 404 when institution is not found', async ({ client }) => {
        const payload = { 
            institutionId: 10000000, //invalid
            primaryColorHex: '#FF0000',
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        };

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(404);
    });

    test('should return 400 when primary color is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#invalid', // Invalid
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        }

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400);
    })

    test('should return 400 when secondary color is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000',
            secondaryColorHex: '#invalid', // Invalid  
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        }

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400);
    })
    test('should return 400 when lightModeLogoUrl URL is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000', 
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'invalid_url', // Invalid
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        }

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400)
    })
    
    test('should return 400 when light mode alt logo URL is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000',
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'invalid_url', // Invalid
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        }

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400);
    });

    test('should return 400 when dark mode logo URL is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000', 
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'invalid_url', //invalid
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            theme: 'dark',
        };

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400)
    });

    test('should return 400 when dark mode alt logo URL is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000', 
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'invalid_url', //invalid
            faviconUrl: 'https://example.com/favicon.png',
            theme: 'dark',
        };

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400);
    });
    

    test('should return 400 when favicon URL is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000', 
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'invalid_url', // Invalid
            theme: 'dark',
        }

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400)
    })

    test('should return 400 when theme is invalid', async ({ client }) => {
        const payload = {
            institutionId: 1,
            primaryColorHex: '#FF0000', 
            secondaryColorHex: '#00FF00',
            lightModeLogoUrl: 'https://example.com/logo_light.png',
            lightModeAltLogoUrl: 'https://example.com/logo_alt_light.png',
            darkModeLogoUrl: 'https://example.com/logo_dark.png',
            darkModeAltLogoUrl: 'https://example.com/logo_alt_dark.png',
            faviconUrl: 'invalid_url', // Invalid
            theme: 'invalid_theme',
        };

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
        response.assertStatus(400);
    });
    test('should return 422 when required field is missing', async ({ client }) => {
        const payload = {
            primaryColorHex: '#FF0000',
        };

        const response = await client.put('api/v1/institution/editVisuals').form(payload)
    
        response.assertStatus(422);
    });


})
*/