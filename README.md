# Simple Snippet Manager
A dead simple snippet manager with self hosting without any cost.

### Dependencies:
- Cloud Firestore
- Firebase Authentication

#### How to run locally:

- Install all packages `yarn`
- Download Firebase tools `yarn global add firebase-tools`
- Run Firebase emulators `firebase emulators:start --import=./dir --export-on-exit`
- Run React app `yarn start`
- Create a account on Firebase Auth at [http://localhost:30111/auth](http://localhost:30111/auth). (Note: you have to create account on Firebase emulator every time you close it. Auth export not supported yet)
- Sign in with the newly created email and password.

#### How to deploy:
You can deploy this app on platform like Netlify, Vercel, Firebase and etc without any penny.
Before deploying you need to create a Firebase project and enable `Authentication` and `Firestore`.
- Add a `Web App` in firebase then you will get the firebase config which will be needed as environment variable when we deploy the app. Check [.env.example](./.env.example) to get the idea which key is needed.
- Create an account from Firebase console with email and password. Which will be needed to login on the app after it is deploy.

> Disclaimer: This app is on lifelong development cycle. Nothing is stable and never will be.