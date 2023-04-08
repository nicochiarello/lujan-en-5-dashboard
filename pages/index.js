import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Luján en 5 Dashboard</title>
        <meta name="description" content="Luján en 5 Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      </div>
    </>
  )
}
