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
        error.setAttribute('display', 'none');

        // Get values
        const [ email, password ] = event.currentTarget;

        // Check fields are blank
        const regExpEmail = new RegExp("^[A-Za-z0-9]{2,}@([A-Za-z]{2,})*.([A-Za-z]{2,})", "gi");
        const regExpPassword = new RegExp("^[A-Za-z0-9]{2,}", "gi");

        if (!regExpEmail.exec(email.value) || !regExpPassword.exec(password.value)) {
            error.innerHTML = 'Missing email and/or password.';
            error.setAttribute('display', 'block');
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