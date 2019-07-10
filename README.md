# Firebase Deep Dive

A deep dive into developing web applications with Firebase.
This will cover everything from setting up your Firebase account,
developing a NodeJS application locally, to deploying your web application
to the Firebase hosting, and more.

## Setup

### Requirements

Setup doesn't require much except the following:

- Google Account (_Needed to sign up for Firebase_)
- Associated Credit Card (_Needed to be able to pay for the services_)

### Sign Up

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

2. Side Navigation

3. Content / Section Configurations