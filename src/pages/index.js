import { Inter } from 'next/font/google'
import Head from 'next/head'
import Mixtape from './mixtape'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <meta property='title' content='Spotify Mixtape'/>
        <meta property='description' content='Creates an image listing the most niche artists you have listened to'/>
        <meta property='author' content='Jake Schroder'/>
        <meta property='viewport' content='width=device-width, intital-scale=1.0'/>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <Mixtape/>
      </main>
    </>
  )
}
