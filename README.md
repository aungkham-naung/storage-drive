## Introduction 🚀

**StoreIt** - a storage platform designed to help individuals store, manage, backup, and share files securely across all devices.

## Technology Stack 🛠️

- React
- Next.js
- Appwrite
- TailwindCSS
- ShadCN
- TypeScript

## Features 💫

✅ ** User Authentication with Appwrite **: Provide sign-up, login, and logout functionalities through Appwrite's authentication system.

✅ ** File Uploads **: Effortlessly upload multiple files, supporting various file types such as documents, images, videos, audio, and more.

✅ ** View and Manage Files **: Enable easy file browsing with options to modify files.

✅ ** Download Files **: Allows users to download uploaded files for an instant access to essential documents.

✅ ** Share Files **: Users can seamlessly share their upload files with others to support collaboration and easy access to important documents.

✅ ** Sort Files **: Organize files efficiently by sorting them by date, name, or size, for a smooth browsing experience.

✅ ** Global Search **: Users can quickly locate uploaded documents and shared content across the platform.

## Quick Start 🏁

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/aungkham-naung/storage-drive.git
cd storage-drive
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT=""
NEXT_PUBLIC_APPWRITE_DATABASE=""
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=""
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=""
NEXT_PUBLIC_APPWRITE_BUCKET=""
NEXT_APPWRITE_SECRET=""
```

Replace the values with your actual Appwrite credentials. You can obtain these credentials by signing up &
creating a new project on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
