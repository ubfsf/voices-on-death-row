import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const metadata = {
  title: 'Voices On Death Row',
}

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="/images/logo_transparent.ico" alt="Voices on Death Row" width="192" height="192" />
      </div>
    ),
    {
      width: 192,
      height: 192,
    },
  )
}
