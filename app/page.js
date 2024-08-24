import Head from 'next/head';
import Builder from './components/Builder';

export default function Home() {
  
  return (
    <div>
      <Head>
        <title>Portfolio Website Builder</title>
        <meta name="description" content="Create your business portfolio with ease using our dynamic website builder." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black">
        <h1 className="text-center text-3xl font-bold pt-10 text-white">
          Prosite Builder
        </h1>
        <Builder />
      </main>
    </div>
  );
}
