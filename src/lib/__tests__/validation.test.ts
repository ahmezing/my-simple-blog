import { postSchema } from '../validation'

describe('Post Schema Validation', () => {
  const validPost = {
    title: 'عنوان المقال',
    body: 'محتوى المقال باللغة العربية',
    author: 'الكاتب',
    time_to_read: 5,
  }

  test('accepts valid Arabic post data', () => {
    const result = postSchema.safeParse(validPost)
    expect(result.success).toBe(true)
  })

  test('rejects non-Arabic title', () => {
    const invalid = { ...validPost, title: 'English Title' }
    const result = postSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  test('rejects title exceeding max length', () => {
    const invalid = { ...validPost, title: 'ع'.repeat(71) }
    const result = postSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  test('rejects body exceeding max length', () => {
    const invalid = { ...validPost, body: 'ع'.repeat(4001) }
    const result = postSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})