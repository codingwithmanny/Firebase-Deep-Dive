# Firebase Setup

Part of the **Firebase Deep Dive** Course
<https://github.com/mpineault/Firebase-Deep-Dive>

## Requirements

Setup doesn't require much except the following:

- Google Account (_Needed to sign up for Firebase_)
- Associated Credit Card (_Needed to be able to pay for the services_)

## Sign Up

Once you have a Google Account, signing up to Firebase should be relatively easy.

1. Go `https://firebase.google.com`

2. In the top left click **Go to console**

    Here you'll see where all your Firebase projects are, including ones you have been invited to.
    **TIP:** _If you have been invited to a Firebase project and you accepted the invitation, you may need to clear you cache and refresh this page in order to see the project appear in your **"Your Firebase Projects"**_

3. To start a new project, click **Add project**

    You'll see a new modal window which will ask you to fill in the information needed to create your new project.

4. To setup a new project, fill in a unique name under the **Project name** field.

    You'll see when you type that it will genenrate a **Project ID**. This is important because this project ID will be used globally. You can change this by clicking the **Edit Pencil Icon** but this will matter less if you are associating a domain to this later.

5. Choose your **Analytics location**, which will decide reporting, currency, and apply the laws of that country.

6. You can choose to use the default settings for sharing Google Analytics for Firebase data or you choose your own for later. For now, let's check this ✅.

7. Agree to the _controller-controller terms_, by checking off ✅ "I accept...:

8. Click **Create project**

    It may take a few minutes for it to set up with "Finishing up".

9. When "Your new project is ready" click **Continue**

You'll be redirected to your project's "Project Overview"

## Project Overview

The `Project Overview` is your main dashboard for your project.

It is split up into 3 main sections.

1. Top Navigation

    The top navigation is used to switch between your Firebase projects, easily go to docs, get updates, and switch your accounts.

2. Side Navigation

    The left side bar navigation is used to get to navigate to the difference services offered from Firebase, as well as upgrade their services to have access to more API calls, and have the ability to extend your project to Google Cloud Platform (GCP).

3. Content / Section Configurations

    The content section is just what setting and/or configurations show up from the side navigation selections. It also tries to keep you up to date on how to use its services and what's new in the world of Firebase.

## Private Website With Firebase Hosting & Authentication

Now that's we're familiar with the basics of the interface, we're going to jump right into creating an application using only the services that we need at the moment.

### New Repository & Firebase Project Setup

Create a new repository on github and clone the repo locally.

If you don't have Node Version Manager (NVM) installed, I highly recommend installing it from this repository: `https://github.com/nvm-sh/nvm`

The reason why `nvm` is great is becasue **Firebase** supports a specific version of **Node** that we might not have installed on our computer.

As of _July, 2019_, Firebase currently supports **node** version `8.16.0`.

#### Install Node

In the root of your repository, create a new `.nvmrc`.
This fill is read by `nvm` to know which node version to use for this project.

File `/.nvmrc`

```text
8.16.0
```

Next, run:

```bash
nvm install;
```

This will look to see if you have node version `8.16.0` installed locally and if not proceed to download it.

#### Install Firebase Tools

There two ways to do this.

**Method 1: (Not Preferred)**
The first way is the method that Google prefers, by installing `firebase-tools` globally on your computer, by doing `npm install -g firebase-tools`. This will allow you to use the `firebase` command natively in your terminal. I don't prefer this method because of two reasons:

1. It goes against a project being fully portable, self contained, and agnostic to the environment you're developing on.

2. If you decide to switch node versions with `nvm` you need to reinstall the firebase tools for every node version you switch to.

**Method 2: (Preferred)**
The second way is just to install `firebase-tools` as a package dependency of the project. You can still take advantage of all the functionalit of `firebase-tools` just with some added text to reference the directory that it's installed in _(Typically `./node_modules/firebase-tools/lib/bin/firebase.js`)_

Before we can do that we need to init our project. For the next few commands I'll be using `yarn` to install the dependencies, but I'll write the `npm` equivalent commands.

**How To Install Yarn:** `https://yarnpkg.com/lang/en/docs/install`

Run this in the root of your repository:

```bash
yarn init; # npm init
```

Go through the steps of defining the default parameters of your project, and when it's done, it should generate a new `package.json` in the root of the repository.

Next, let's run the following to install `firebase-tools`:

```bash
yarn add firebase-tools --dev; # npm install firebase-tools --dev
```

For good measure, make sure to add a `.gitignore` file which ignores the `node_modules`:

File: `/.gitignore`

```text
node_modules
```

Now we're good to start using firebase commands to initiate our project.

#### Firebase Project Setup

Next we're going to need to associate our **Fireabse** project to the repository we're working with.

To start, we first need to authenticate our account. Run the following, which will redirect you to a browser to authenticate your Google account:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js login; # firebase login
```

Once you login on the browser it will ask you some permissions to access your information, which is typical for OAuth authentication systems. Accept and you should now see that you're logged in on your terminal.

After you've logged in, you'll need to associate the project that you recently created to with the repository. Run the following to see a list of your existing projects:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js list; # firebase list
```

You should see something like the following:

| Name                  | Project ID Instance  | Permissions  |
| --------------------- | -------------------- | ------------ |
| Firebase Project Name | firebase-project-name | Owner        |

Take note of the **Project ID Instance**.

We'll now setup our current repository to use that project by running:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js init; # firebase init
```

You'll walk through a few stesp but for the process of this tutorial we'll just be taking advantage of the `Hosting` functionality.

```bash
Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
❯◉ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
```

Next we'll going to select the project we just recently created:

```bash
Select a default Firebase project for this directory: (Use arrow keys)
  [create a new project]
  [don\'t setup a default project]
❯ firebase-project-name (Firebase Project Name)
```

It will prompt you for the following, choose `yes`

```bash
What do you want to use as your public directory? (public)
```

For this project we'll be creating a Single-Page Application (SPA), so for the next prompt answer `y`:

```bash
 Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
```

What this means, is that this will configure the http serve to redirect all traffic to `/index.html` in the root of our hosting. This means that if we decide to create folder subdirectories like `/myfolder/index.html` it will not load that file, but instead load the default root `/index.html`. Or to see it better:

Hosting root folder structure:

```bash
index.html # Will always load this
myfolder/ # Will not reconized this
-- index.html # Will not load this
```

Once the project is setup it will generate two new files.

1. `.firebaserc` - The default firebase configuration fire that tells firebase tools which project to use when in this directory.

    ```json
    {
    "projects": {
        "default": "firebase-project-name"
    }
    }
    ```

2. `firebase.json` - The configuration file for the hosting that tells Firebase Hosting which files to load and from what directory, what rewrite rules are in place, and what files not to upload to hosting.

```json
{
  "hosting": {
    "public": "public", // tells to load the index.html  in the /public folder
    "ignore": [ // files to ignore when uploading to firebase hsoting
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ // tells the http server to redirect all (**) routes to index.html (destination)
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**PRO TIP:** Typically we want to avoid keeping any crendentials, project names, and sensitive information stored within your git repository. So we're going to take the necessary steps to `.gitignore` our `.firebaserc` file and place a template in its place to be copied over when the next developer wants to work on this project. This also helps make the project more portable and not restricted to a specific Firebase project, and make it so that we can easily deploy it to another Firebase project.

Make the following modifications:

1. Modify `/.gitignore`

    ```text
    node_modules
    *.log
    .firebase
    .firebaserc
    ```

2. Create a new file called `/.firebaserc.example` and put the following in it:

    ```json
    {
    "projects": {
        "default": "{your-firebase-project-id}"
    }
    }
    ```

## Running Our Project

This step is quite simple, but let's see how our project looks when we run it.

Run the following:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js serve;

# Expected output
# i  hosting: Serving hosting files from: yes
# ✔  hosting: Local server: http://localhost:5000
```

Load in your browser: `http://localhost:5000`

You shoudl see a default message that says:

```text
Welcome

Firebase Hosting Setup Complete

You're seeing this because you've successfully setup Firebase Hosting. Now it's time to go build something extraordinary!

Open Hosting Documentation

Firebase SDK loaded with auth, database, messaging, storage
```

Congrats you got Firebase working on locally on your computer.
