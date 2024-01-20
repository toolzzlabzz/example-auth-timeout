import { string } from '@ioc:Adonis/Core/Helpers'
export default function slugify(text: string) {
    text = string.camelCase(text)
    return text
}