import SignOutButton from '@/components/clickables/sign-out-button'
import { getServerSession } from '@/utils/auth/server'
import { constructMetadata } from '@/utils/metadata'

export const metadata = constructMetadata()

export default async function Dashboard() {
  const session = await getServerSession()

  return (
    <div className="flex flex-col p-4">
      <div>Hi {session?.user.name}, from Dashboard</div>
      <SignOutButton />
    </div>
  )
}
