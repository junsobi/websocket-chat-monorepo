/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="실시간 채팅 서비스입니다." />
        <meta property="og:title" content="실시간 채팅 서비스" />
        <meta
          property="og:description"
          content="두 명의 사용자가 실시간으로 소통할 수 있는 서비스입니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/chat-preview.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>실시간 채팅</title>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
