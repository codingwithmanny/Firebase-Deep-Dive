# Step 01 - Website Step & Deployment

## Creating Our UI

Next, we're going to modify our `./public/index.html` to show a form and create `JavaScript` in Vanilla JavaScript.

File: `./public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Your Firebase Project</title>
</head>
<body>
  <section>
    <h1>Your Firebase Project</h1>
    <form>
      <label for="email">Email
        <input type="email" name="email" value="" placeholder="Email Address" />
      </label>
      <label for="password">Password
          <input type="password" name="password" value="" placeholder="Password" />
      </label>
      <p>An error occurred!</p>
      <button type="submit">Login</button>
    </form>
  </section>
</body>
</html>
```

Let's add some styling to this a bit using both `Normalize.css` and adding our own styling:

**Normalize CDN:** https://cdnjs.com/libraries/normalize

File: `./public/index.html`

```html
...
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <title>Your Firebase Project</title>
</head>
<body>
  ...
```

File: `./public/css/styles.css`

```css
body {
    font-family: Helvetica, Arial, sans-serif;
    background: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

section {
    background: #ffffff;
    overflow: hidden;
    width: 320px;
    border-radius: 4px;
    padding: 20px;
}

section h1 {
    margin-top: 0;
    font-size: 24px;
    text-align: center;
}

section form label {
    display: block;
    margin-bottom: 20px;
    color: #ccc;
}

section form input {
    display: block;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    width: calc(100% - 20px);
    margin-top: 10px;
}

section form input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

section form p {
    display: none;
    margin-bottom: 10px;
    background-color: rgba(208, 55, 55, 0.2);
    color: rgb(208, 55, 55);
    font-size: 14px;
    border-radius: 2px;
    line-height: 36px;
    padding: 0 10px;
}

section form button {
    display: block;
    border: none;
    border-radius: 2px;
    background-color: green;
    color: white;
    height: 50px;
    width: 100%;
}

section form button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

Add the styling to our html page:

File: `./public/index.html`

```html
...
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link rel="stylesheet" href="/css/styles.css">
  <title>Your Firebase Project</title>
</head>
<body>
  ...
```

## Adding JavaScript

Now that we have the UI, we'll add some JavaScript functionality, by creating a new `scripts.js` file.

File: `./public/js/scripts.js`

```javascript
window.onload = () => {
    // Get form
    const form = document.querySelector('form');
    const fields = document.querySelectorAll('input')
    const error = document.querySelector('form p');
    const button = document.querySelector('button');

    // Add event
    form.addEventListener('submit', (event) => {
        // Prevent form from submitting
        event.preventDefault();

        // Reset error message
        error.innerHTML = '';
        error.setAttribute('style', 'display: none;');

        // Get values
        const [ email, password ] = event.currentTarget;

        // Check fields are blank
        const regExpEmail = new RegExp("^[A-Za-z0-9]{2,}@([A-Za-z]{2,})*.([A-Za-z]{2,})", "gi");
        const regExpPassword = new RegExp("^[A-Za-z0-9]{2,}", "gi");

        if (!regExpEmail.exec(email.value) || !regExpPassword.exec(password.value)) {
            error.innerHTML = 'Missing email and/or password.';
            error.setAttribute('style', 'display: block;');
            return; // do nothing
        }

        // Disabled fields and button to show loading state
        fields[0].setAttribute('disabled', 'disabled');
        fields[1].setAttribute('disabled', 'disabled');
        button.innerHTML = 'Loading...';
        button.setAttribute('disabled', 'disabled');

        // Perform Firebase Request
    });
};
```

## Quick Deploy

Now that we have the base of our UI and some JavaScript interaction, let's make a push to our Firebase hosting.

Make sure to stop your current `firebase serve` process by pressing `ctrl` + `c` on your keyboard while in your terminal.

To deploy our current application we just need to run:

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

Now if you visit: `https://your-firebase-project-id.firebaseapp.com` you should see your project deployed to firebase.