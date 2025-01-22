import { init } from '@paralleldrive/cuid2'

export interface CuidProps {
  fingerprint: 'id' | 'idempotency-key'
}

export const cuid = (props: CuidProps = { fingerprint: 'id' }) =>
  init({
    fingerprint: props.fingerprint,
  })()
