import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { AnimateSharedLayout, motion } from "framer-motion";

import { default as AllSessions } from "../features/Sessions/List/List";

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-5 bg-gray-100 sm:p-6">
      <div className="container max-w-5xl mx-auto">
        <Head>
          <title>Artsy Fartsy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="">
          {/* Section Header start */}
          <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h1 className="text-lg font-medium leading-6 text-gray-900">
              All Sessions
            </h1>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <Link href="/session/new">
                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create new session
                </a>
              </Link>
            </div>
          </div>
          {/* Section header end */}

          <AnimateSharedLayout>
            <motion.div
              layout
              className="mt-5 overflow-hidden bg-white shadow sm:rounded-md"
            >
              <AllSessions />
            </motion.div>
          </AnimateSharedLayout>
        </main>
      </div>
    </div>
  );
}
