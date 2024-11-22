document.addEventListener('DOMContentLoaded', function() {

    const contactFormSubmitBtn = document.getElementById('contact-form-submit');
    const contactFormSubmitBtnText = contactFormSubmitBtn.innerHTML;
    const contactFormSubmitBtnPendingContent = '<div class="d-flex align-items-center gap-2">Envoi en cours <div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div></div>'
    const modalBody = document.querySelector('#contactModal .modal-body');
    const sucessAlert = '<div class="alert alert-success border-0 mt-2">Merci, votre message a bien été envoyé !</div>';
    const errorAlert = '<div class="alert alert-danger border-0 mt-2">Une erreur est survenue dans l\'envoi de votre message. Veuillez réessayer.</div>';
    const allInputs = document.querySelectorAll('#contactModal input, #contactModal textarea, #contactModal select, #contactModal button, #contactModal fieldset, #contactModal legend, #contactModal optgroup, #contactModal option');

    // Fonction pour reitinialiser les champs du formulaire
    const emptyFormFields = function () {
        allInputs.forEach(input => {
            // Si l'élément est un <input>, <textarea>, ou <select>
            if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
            input.value = '';
            }
            // Si l'élément est un select
            if (input.tagName === 'SELECT') {
            input.selectedIndex = -1; 
            }
        });
    }

    // Suppression d'éventuelles alertes déjà présentes
    const alerts = document.querySelectorAll('#contactModal .modal-body .alert');
    alerts.forEach(alert => alert.remove());

    // Effacement du formulaire
    document.getElementById('empty-field-btn').addEventListener('click', emptyFormFields);

    // Soumission du formulaire
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Maj de l'UI du bouton
        contactFormSubmitBtn.innerHTML = contactFormSubmitBtnPendingContent;

        // Récupérer les données du formulaire
        const formData = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            recaptcha_response: grecaptcha.getResponse()
        };

        console.log('Recaptcha response : ' + formData.recaptcha_response);

        // Vérification du reCAPTCHA
        if (!formData.recaptcha_response) {
            alert("Veuillez confirmer que vous n'êtes pas un robot.");
            // Maj de l'UI du bouton
            contactFormSubmitBtn.innerHTML = contactFormSubmitBtnText;
            return;
        }

        // Envoyer les données au serveur
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    // Maj de l'UI du bouton
                    contactFormSubmitBtn.innerHTML = contactFormSubmitBtnText;

                    // Message de confirmation
                    modalBody.insertAdjacentHTML('beforeend', sucessAlert);

                    // Réinitialisation du formulaire
                    emptyFormFields();
                } else {
                    // Maj de l'UI du bouton
                    contactFormSubmitBtn.innerHTML = contactFormSubmitBtnText;
                    // Message d'erreur
                    modalBody.insertAdjacentHTML('beforeend', errorAlert);
                }
            })
            .catch((error) => {
                console.error('Erreur:', error);

                // Maj de l'UI du bouton
                contactFormSubmitBtn.innerHTML = contactFormSubmitBtnText;
                modalBody.insertAdjacentHTML('beforeend', errorAlert);
            });

            grecaptcha.reset();
    });

});