'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

// Dynamic import with SSR disabled for Sanity Studio
const StudioPage = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function Studio() {
  return <StudioPage config={config} />
}
