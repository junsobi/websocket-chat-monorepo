# WebSocket Chat Application

이 프로젝트는 두 명의 유저가 WebSocket을 통해 실시간으로 채팅할 수 있도록 설계된 Next.js 애플리케이션입니다.

## 실행 방법

1. **의존성 설치**:

   ```bash
   yarn install
   ```

2. **환경 변수 설정(선택)** : 기본적으로 WebSocket 서버 URL은 다음과 같이 설정되어 있습니다
   ```bash
   wss://websocket-chat-monorepo.onrender.com
   ```

만약 다른 WebSocket 서버를 사용하고 싶다면 프로젝트 루트에 .env.local 파일을 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_WEBSOCKET_URL=ws://your-custom-websocket-server.com
```

3. **개발 서버 실행**

   ```bash
   yarn dev
   ```

4. **브라우저에서 접속**

   ```bash
   http://localhost:3000
   ```
