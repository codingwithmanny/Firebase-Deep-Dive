# Step 02 - Enabling Authentication

The next step would be to enable authentication for our project in Firebase and install the right package dependencies to support.

## Enabling Firebase Authentication

In order for authentication to first be used, it needs to be enabled in the Firebase console.

In the console, on the left side navigation, under **Develop**, go to **Authentication**, OR go to:

https://console.firebase.google.com/project/{your-firebase-project-id}/authentication/users

In the **Authentication** section, you'll notice that Authentication haven't been setup, so to start you'll need to click the button labeled **Set up sign-in method** or in the top navigation click **Sign-in method**.

In this section you'll be presented with 3 major sections:

1. **Sign-in providers**

Different sign-in methods available to allow your application to use.

2. **Authorised domains**

The different URLs that are authorized to make API calls and requests to firebase from.

3. **Advanced**

- **One account per email address** which allows you to configure if you want a user to create multiple accounts with the same email address.

- **Manage sign-up quota** where you can create temporary limits for requests made to your firebase project.

We only need to enable email authentication and to so:

1. Hover over _Email/Password_  and click on the ✏️ **(Pencil Icon)**

2. Click the first **Enable** switch from the top.

3. Click **Save**

You'll see that the `Status` of **Email/Password** is now `Enabled`

## Setting Up Configuration Credentials

The next step is to setup the configuration file to allow for our application to connect to our Firebase project.

In the left sidebar navigation, next to **Project Overview**, click the ⚙️ **(Gear Icon)**, and then click **Project settings**.

This will load the **Settings** page.

Under **Your app** click the `</>` **(Web App Icon)**.

This will prompt you to give your application an **App nickname**, give it any name you'd like.

There will also be a checkbox asking if you'd like to "Also set up Firebase Hosting for this app.". You can click the charkmark and select `{your-firebase-project-id}` from the dropdown.

When you're finished, click **Register app**.

Once it's done it will tell you to "Add Firebase SDK" to your application by copying pasting the following code:

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/6.3.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#reserved-urls -->

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
```

Click **Continue to the console**

You'll be redirected back to **Your apps** where you'll have new configuration options.

Under **Firebase SDK snippet** you'll see 3 options (`Automatic`, `CDN`, and `Config`).

`Automatic` - is meant to be loaded from Firebase directly once it's deployed.

`CDN` - is meant to be use on any HTML page

`Config` - is usually meant to be integrated in the a web application

For this Step, we're going to choose `CDN` and copy and page the following code:

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "{your-api-key}",
    authDomain: "{your-firebase-project-id}.firebaseapp.com",
    databaseURL: "https://{your-firebase-project-id}.firebaseio.com",
    projectId: "{your-firebase-project-id}",
    storageBucket: "",
    messagingSenderId: "{your-messaging-sender-id}",
    appId: "{you-app-id}"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

Copy the code above and paste it in our html page:

File `./public/index.html`

```html
...
  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js"></script>

  <!-- TODO: Add SDKs for Firebase products that you want to use
      https://firebase.google.com/docs/web/setup#config-web-app -->

  <script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "{your-api-key}",
      authDomain: "{your-firebase-project-id}.firebaseapp.com",
      databaseURL: "https://{your-firebase-project-id}.firebaseio.com",
      projectId: "{your-firebase-project-id}",
      storageBucket: "",
      messagingSenderId: "{your-messaging-sender-id}",
      appId: "{you-app-id}"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  </script>
  <script src="/js/scripts.js"></script>
  <title>Your Firebase Project</title>
</head>
...
```

You'll noticed that we're storing this in the `<head>` for now because our `scripts.js` file is also in the `<head>` and needs to be loaded just after the firebsae scripts. Later we'll move all scripts to the bottom, just before the end `</body>`.

**NOTE:** There is a chance that your changes won't look like they took affect when you look in your browser. Make sure to clear your cache and reload your page to see the changes.

## Adding Authentication Request

Next, we'll start adding authentication using the firebase authentication package.

File: `src/js/scripts.js`

```javascript
        // Perform Firebase Request
        // https://firebase.google.com/docs/auth/web/start?authuser=0#sign_in_existing_users
        firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .catch(function(err) {
            // Handle Errors here.
            var errorCode = err.code;
            var errorMessage = err.message;
            // ...
        });
    });
};
```

If you save this file and try to login, you'll see that the forms get disabled but nothing is happening. That's because `firebase.auth` isn't setup, and we're not doing anything to handle the login or errors.

If you check the `Console` in the `Developer Tools`, you'll see this error:

```javascript
scripts.js:39 Uncaught TypeError: firebase.auth is not a function
    at HTMLFormElement.<anonymous> (scripts.js:39)
(anonymous) @ scripts.js:39
```

To solve this, we need to add the `firebase.auth` dependency.

You can see it under this documentation:
https://firebase.google.com/docs/web/setup#namespace

Where you see **Available libraries**, and expand the following section:
https://firebase.google.com/docs/web/setup#libraries_CDN

The part we're looking for is this section to add to our html file:

```html
<script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-auth.js"></script>
```

We'll modify our html like below:

File `./public/index.html`

```html
...
  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-auth.js"></script>

  <!-- TODO: Add SDKs for Firebase products that you want to use
      https://firebase.google.com/docs/web/setup#config-web-app -->

  <script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "{your-api-key}",
      authDomain: "{your-firebase-project-id}.firebaseapp.com",
      databaseURL: "https://{your-firebase-project-id}.firebaseio.com",
      projectId: "{your-firebase-project-id}",
      storageBucket: "",
      messagingSenderId: "{your-messaging-sender-id}",
      appId: "{you-app-id}"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  </script>
  <script src="/js/scripts.js"></script>
  <title>Your Firebase Project</title>
</head>
...
```

If we refresh our html page and try with the email and password:

EMAIL: `user@example.com`
PASSWORD: `asdf1234`

We'll see in our `Developer Tools` > `Network` a `400` response with the body:

```json
{
  "error": {
    "code": 400,
    "message": "EMAIL_NOT_FOUND",
    "errors": [
      {
        "message": "EMAIL_NOT_FOUND",
        "domain": "global",
        "reason": "invalid"
      }
    ]
  }
}
```

That means our code is working, but we just haven't registered an account.
We'll need to register a new account manually in the Firebase console.

Before we move on, let's account for the error message by modifying our javascript code:

File: `src/js/scripts.js`

```javascript
        firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .catch(function(err) {
            // Handle Errors here.
            // var errorCode = err.code;
            var errorMessage = err.message;

            fields[0].removeAttribute('disabled');
            fields[1].removeAttribute('disabled');
            button.innerHTML = 'Login';
            button.removeAttribute('disabled');
            error.innerHTML = errorMessage;
            error.setAttribute('style', 'display: block;');
        });
    });
};
```

If you go back to our page an enter the login credentials and click **Login** we'll now see the following error show up in our html login page:

```text
There is no user record corresponding to this identifier. The user may have been deleted.
```

Now, let's create our user in the Firebase console:

1. Go back, in the console, to: **Develop** > **Authentication** > **Users**

OR

https://console.firebase.google.com/project/{your-firebase-project-id}/authentication/users

2. Click **Add user** and fill in the email and password with:

EMAIL: `user@example.com`
PASSWORD: `asdf1234`

3. Click **Add user**

Refresh our page and let's try logging in with those credentials.

If we check the **Developer Tools** > **Network** and we should see a `200` request with something similar to the following structure:

```json
{
  "kind": "identitytoolkit#GetAccountInfoResponse",
  "users": [
    {
      "localId": "{user-uid}",
      "email": "user@example.com",
      "passwordHash": "{user-hashed-password}",
      "emailVerified": false,
      "passwordUpdatedAt": 1563044398528,
      "providerUserInfo": [
        {
          "providerId": "password",
          "federatedId": "user@example.com",
          "email": "user@example.com",
          "rawId": "user@example.com"
        }
      ],
      "validSince": "1563044398",
      "disabled": false,
      "lastLoginAt": "1563045834198",
      "createdAt": "1563044398528"
    }
  ]
}
```

## Refactoring HTML File

For the next steps, we'll want to change our HTML file to add a logout and check if our user is already logged in.

We'll be adding a new section called `id="LOGOUT"` and adding a `id="LOGIN"` to our origin `section`.

File: `./public/index.html`

```html
...
<body>
  <!-- LOGIN -->
  <section id="login">
    <h1>Your Firebase Project</h1>
    <form>
      <label for="email">Email
        <input type="email" name="email" value="" placeholder="Email Address" />
      </label>
      <label for="password">Password
          <input type="password" name="password" value="" placeholder="Password" />
      </label>
      <p></p>
      <button type="submit">Login</button>
    </form>
  </section>
  <!-- end LOGIN -->

  <!-- LOGOUT -->
  <section id="logout">
    <h2>Already logged in as <code></code></h2>
    <button>Logout</button>
  </section>
  <!-- end LOGOUT -->
</body>
...
```

## Validate If the User Is Already Authenticated

In order for us to check if the user is already authenticated, we're going to use the `firebase.auth().onAuthStateChanged()` function as documented here: https://firebase.google.com/docs/auth/web/start?authuser=0#set_an_authentication_state_observer_and_get_user_data

We'll add this at the beginning of our javascript file when the `window` is loaded:

File `./public/js/scripts.js`

```javascript
window.onload = () => {
    // Get form
    const form = document.querySelector('form');
    const fields = document.querySelectorAll('input')
    const error = document.querySelector('form p');
    const button = document.querySelector('button');

    // Get sections
    const sectionLogin = document.querySelector('section#login');
    const sectionLogout = document.querySelector('section#logout');
    const code = document.querySelector('code');

    // Blank out email at start
    code.innerHTML = '';

    // Validate if user already authenticated
    firebase
    .auth()
    .onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            // 1. Hide login section
            sectionLogin.setAttribute('style', 'display: none;');

            // 2. Show logout section
            sectionLogout.setAttribute('style', 'display: block;');

            // Show loging email
            code.innerHTML = user.email;
        } else {
            // User is signed out.
            // 1. Hide logout section
            sectionLogout.setAttribute('style', 'display: none;');

            // 2. Show logout section
            sectionLogin.setAttribute('style', 'display: block;');
        }
    });
...
```

Now when we reload the main page, it'll take a second, but we should see:

```text
Already logged in as user@example.com
```

## Fixing CSS Sections

You'll notice when you refresh the page, both sections are showing before it gets a response back form Firebase if the user is already logged in our not.

To fix this, we're just going to hide both sections at start, and then let our javascript decide which one to show afterwards.

File: `./public/css/styles.css`

```css
section {
    display: none;
    ...
```

We'll also fix our logout button to give it some styling:

File: `./public/css/styles.css`

```css
...
section form button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

section#logout button {
    display: block;
    border: none;
    border-radius: 2px;
    background-color: #ccc;
    cursor: pointer;
    color: #333;
    height: 50px;
    width: 100%; 
}
```

## Logout Functionality

What if we want to show the login form again?

We need to add a function which allows the user to logout.

The nice thing about `firebase.auth().onAuthStateChanged()` is that it will automatically get triggered once the user is logged out with Firebase.

So we just need to get the get the dom element from the `section#logout` and add logout functionality when it's clicked:

File `./public/js/scripts.js`

```javascript
...
    const code = document.querySelector('code');
    const buttonLogout = document.querySelector('section#logout button');

    // Blank out email at start
    code.innerHTML = '';

    // Logout functionality
    buttonLogout.addEventListener('click', event => {
        firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.
        })
        .catch(function(err) {
            // An error happened
            console.log('Something wrong happened:');
            console.log(err);
        });
    });
```

Now when we go back to our application and click logout, we should see our login form, and when we login, we should see the logout section. The section should also persist, if you refresh the page.

## Deploying

Lastly, let's deploy this application again but stopping `firebase serve` with `ctrl` + `c` and then running the following code:

```bash
./node_modules/firebase-tools/lib/bin/firebase.js deploy; # firebase deploy

# Expected Output
# === Deploying to 'your-firebase-project-id'...
#
# i  deploying hosting
# i  hosting[your-firebase-project-id]: beginning deploy...
# i  hosting[your-firebase-project-id]: found 3 files in public
# ✔  hosting[your-firebase-project-id]: file upload complete
# i  hosting[your-firebase-project-id]: finalizing version...
# ✔  hosting[your-firebase-project-id]: version finalized
# i  hosting[your-firebase-project-id]: releasing new version...
# ✔  hosting[your-firebase-project-id]: release complete
#
# ✔  Deploy complete!
#
# Project Console: https://console.firebase.google.com/project/your-firebase-project-id/overview
# Hosting URL: https://your-firebase-project-id.firebaseapp.com
```
