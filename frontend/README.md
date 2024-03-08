
# LinguaConnect

## Description

This repository will serve the frontend and backend for LinguaConnect.

## Installation and Setup

Fork the repository and then clone the forked repo.

1. Install the required node modules:

```bash
yarn install
```

2. Copy the config file from config.example and make any necessary changes.

```bash
cp config.example.ts config.ts
```

Fill all the client id's and redirect urls for auth as specified in [server](https://github.com/vortex-csg-nitt/vortex24-server?tab=readme-ov-file#vortex24-server)

3. Start the Vite Development Server in developer mode:

```bash
yarn dev
```

The server should be running at your 127.0.0.1 port 3000 (or the port specified in `config.ts`).

3. Install githooks by running

```bash
yarn prepare
```

4. Update the README.md file and config.example if needed.

## Development

1. For adding any new student page it should be added in `src/pages/student`, tutor pages in `src/pages/tutor` and general pages in `src/pages`.
2. Try to split up the pages into small components to prevent unnecessary re-renders of entire pages. Develop all these components in `src/components`.
3. All these components and pages should be exported from corresponding `index.ts` files and these exports should be used for importing them in other files.
4. All student related routes which needs authentication should be in `src/routes/student.routes.tsx`, tutor routes which needs authentication should be in `src/routes/tutor.routes.tsx` and all unauthenticated routes in `src/routes/routes.tsx`. Each route should have corresponding element,title,description and path. An example for each case is already there.
5. All the API calls are in `src/utils/apiCalls.ts`.
6. This app uses Tailwind CSS + Mantine UI, try using these as much as possible and refrain from using global CSS classes.
7. Make sure to follow good programming practices and have proper variable and function names.
8. Update the ReadMe if you are making changes to `config.ts` or adding new scripts in package.json

## Guidelines

1. Open a pr for all the works assigned to you.
2. Refrain from force pushes.
3. Have PR descriptions regarding what all changes are there in the current PR, helps the reviewer.
4. Also have proper commit messages else I will directly close the PR :)

## Resources

[React](https://reactjs.org/) \
[Mantine UI](https://mantine.dev/) \
[Tailwind-CSS](https://tailwindcss.com/)
