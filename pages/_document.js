import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" className='overflow-x-hidden'>
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}