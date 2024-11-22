const contactFormSubmitBtn = document.getElementById('contact-form-submit');
const contactFormSubmitBtnText = contactFormSubmitBtn.textContent;
const contactFormSubmitBtnPendingContent = '<div class="d-flex align-items-center gap-2">Envoi en cours <div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div></div>'
const modalBody = document.querySelector('#contactModal .modal-body');
const sucessAlert = '<div class="alert alert-success border-0 mt-2">Merci, votre message a bien été envoyé !</div>';
const errorAlert = '<div class="alert alert-danger border-0 mt-2">Une erreur est survenue dans l\'envoi de votre message. Veuillez réessayer.</div>';

// Suppression d'éventuelles alertes déjà présente
const alerts = document.querySelectorAll('#contactModal .modal-body .alert');
alerts.forEach(alert => alert.remove());

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Maj de l'UI du bouton
    contactFormSubmitBtn.innerHTML = contactFormSubmitBtnPendingContent;

    // Récupérer les données du formulaire
    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

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
            } else {
                // Message d'erreur
                modalBody.insertAdjacentHTML('beforeend', errorAlert);
            }
        })
        .catch((error) => {
            console.error('Erreur:', error);
            modalBody.insertAdjacentHTML('beforeend', errorAlert);
        });
});