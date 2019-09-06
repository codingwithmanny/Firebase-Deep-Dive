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
        // https://firebase.google.com/docs/auth/web/start?authuser=0#sign_in_existing_users
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