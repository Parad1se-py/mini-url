import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {

  return (
    <>
      <Head>
        <title>Mini-URL</title>
        <meta name="description" content="Mini-URL: A reliable URL shortener with a Discord integration." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#A7C7E7] to-[#F8C8DC]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] drop-shadow-2xl">
          <span className="text-[hsl(201,98%,50%)]">Mini</span>-<span className="text-[hsl(280,100%,70%)]">URL</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 text-white hover:bg-black/20 drop-shadow-lg hover:bg-black/20 drop-shadow-2xl"
              href=""
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Create your mini-url →</h3>
              <div className="text-lg">
                Go to your Mini-URL dashboard to create URLs and manage them!
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 text-white drop-shadow-lg hover:bg-black/20 drop-shadow-2xl"
              href="https://localhost:3000/docs"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Read the documentation on how to use Mini-URL and its Discord integration!
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white drop-shadow-lg">
              What are you waiting for?
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/20 drop-shadow-lg hover:bg-black/20 drop-shadow-2xl"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
