# Trinit'24-Server

## Installation

Fork and Clone the repo to your device.

1. Make sure you have installed yarn on your device

2. Install the node modules:

```bash
yarn install
```

3. Install the githooks:

```bash
yarn prepare
```

## Setup

4. Copy and <b>Configure</b> the `.example.env` then rename it as `.env`, then it should look like

```environment
ENV=DEV
MONGODB_URI=mongodb://localhost:27017/
PORT=4000
FRONTEND_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_STUDENT_REDIRECT_URI=
GOOGLE_TUTOR_REDIRECT_URI=
JWT_SECRET=
....
```

5. Copy and <b>Configure</b> the `config.example.ts` then rename it as `config.ts`, then it should look like

```typescript
const config = {
    db: "trinit",
    port: parseInt(process.env.PORT ?? "4000"),
};
  
export default config;
```

6. Start the server in development mode:

```bash
yarn run dev
```

The server should be running at your local host port 4000.

## Auth setup

Enter a JWT secret in .env file for signing and verifying cookies.

### Student Auth

1. For google auth, the redirect(callback) url is "`FRONTEND_URL`/auth/student/callback/google". eg: For frontend running on port 3000 locally:

```bash
http://localhost:3000/auth/student/callback/google
```

### Tutor Auth

1. For google auth, the redirect(callback) url is "`FRONTEND_URL`/auth/tutor/callback/google". eg: For frontend running on port 3000 locally:

```bash
http://localhost:3000/auth/tutor/callback/google
```

Use the same client which you created for student.

### Google Client

1. Make sure to add the non-sensitive scopes as:

```bash
1../auth/studentinfo.email
2../auth/studentinfo.profile
```

2. Enter the frontend url for authorised domains
3. Enter the mentioned redirect google urls (tutor and student) in the redirect or callback urls.
