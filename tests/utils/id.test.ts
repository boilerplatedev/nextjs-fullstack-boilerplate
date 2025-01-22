import { describe, expect, it } from 'vitest'

import { cuid } from '@/utils/id'

describe('id utils', () => {
  describe('cuid', () => {
    it('should generate a cuid with default fingerprint', () => {
      const id = cuid()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })

    it('should generate a cuid with custom fingerprint', () => {
      const id = cuid({ fingerprint: 'id' })
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })
  })
})
