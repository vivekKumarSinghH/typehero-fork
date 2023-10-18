/* eslint-disable @next/next/no-img-element */
'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { challengeParam, userParam } from 'utils/zodParams';
import './app.css';

const ogImageUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/landing` : '';

export default function Page() {
  const [nonce, setNonce] = useState(Math.random());

  useEffect(() => {
    // randomize nonce on window focus
    const handleFocus = () => setNonce(Math.random());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div>
      <Head>
        <meta name="og:title" content="typehero OG Image Playground" />
        <meta
          name="og:description"
          content="Playground for OG Image Generation using @vercel/og-image"
        />
        <meta name="og:image" content={ogImageUrl} />
        <meta data-rh="true" name="twitter:image" content={ogImageUrl} />
      </Head>
      <main className="grid grid-flow-row grid-cols-2">
        <div>
          <h2>Challenge Card</h2>
          <img
            alt="ayo"
            src={`/api/challenge?${challengeParam.toSearchString({
              description:
                'This is a test card that has a has a nice description lorem40 ipsum dolor sit amet, consectetur adipiscing elit. lorem more text here s aothesntohks anatoh esn uthsanotedhusn hwanoejt hsaont hesnathdoneitsdhsas asnoehusnatohesunthaoenst',
              title: 'Inferring types is fun, but not really',
              username: 'Hacksore',
              date: '84 years ago',
              difficulty: 'EASY',
            })}&random=${nonce}`}
          />
        </div>

        <div>
          <h2>User</h2>

          <img
            alt="ayo"
            src={`/api/user?${userParam.toSearchString({
              username: 'Hacksore',
              bio: 'This is a test card that has a has a nice description lorem40 ipsum dolor sit amet, consectetur adipiscing elit. lorem more text here s aothesntohks anatoh esn uthsanotedhusn hwanoejt hsaont hesnathdoneitsdhsas asnoehusnatohesunthaoenst',
              avatar: 'https://avatars.githubusercontent.com/u/32938743?v=4',
            })}&random=${nonce}`}
          />
        </div>
        <div>
          <h2>Default</h2>
          <img alt="default metadata" src="/api/default" />
        </div>
      </main>
    </div>
  );
}
