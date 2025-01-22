'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const AppProgress = () => {
  return (
    <>
      <ProgressBar height="4px" color="#0f172a" options={{ showSpinner: false }} />
    </>
  )
}

export default AppProgress
