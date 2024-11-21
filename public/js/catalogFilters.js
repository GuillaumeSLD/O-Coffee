document.addEventListener("DOMContentLoaded", function() {

    // Soumission du formulaire de filtres
    const submit = document.getElementById('filtersSubmit');
    const filtersForm = document.getElementById('catalogFilters');

    submit.addEventListener('click', () => {
        filtersForm.submit();
    });

    // On récupère les paramètres d'url dans un tableau
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        // On définit un objet avec des tableaux vides associés aux 3 paramètres possibles
        let paramsObj = {
            origin: [],
            taste: [],
            availability: []
        };

        // On boucle sur les paramètres et on ajoute les valeurs correspondantes à chaque paramètre
        params.forEach((value, key) => {
            if (key === "origin") {
                paramsObj.origin.push(value);
            } else if (key === "taste") {
                paramsObj.taste.push(value);
            } else if (key === "availability") {
                paramsObj.availability.push(value);
            }
        });

        // On retourne l'objet
        return paramsObj;
    }

    // On ajoute l'attribut checked aux inputs qui matchent avec les paramètres d'url
    function setFiltersState() {
        const params = getUrlParams();

        // Inputs pour le filtre Origine
        params.origin.forEach(originValue => {
            const originCheckbox = document.querySelector(`input[name="origin"][value="${originValue}"]`);
            if (originCheckbox) {
                originCheckbox.checked = true;
            }
        });

        // Inputs pour le filtre saveur
        params.taste.forEach(tasteValue => {
            const tasteCheckbox = document.querySelector(`input[name="taste"][value="${tasteValue}"]`);
            if (tasteCheckbox) {
                tasteCheckbox.checked = true;
            }
        });

        // Inputs pour le filtre disponibilité
        params.availability.forEach(availabilityValue => {
            const availabilityCheckbox = document.querySelector(`input[name="availability"][value="${availabilityValue}"]`);
            if (availabilityCheckbox) {
                availabilityCheckbox.checked = true;
            }
        });
    }

    // On exécute la fonction au chargement du DOM
    setFiltersState();

    // On réinitialise les filtres lorsque l'utilisateur clique sur le bouton supprimer.
    const resetButton = document.getElementById('reset-filters-mobile');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // On retire l'attribut checked
            const checkboxes = filtersForm.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            // On soumet de nouveau le formulaire sans les filtres
            filtersForm.submit();
        });
    }    

});