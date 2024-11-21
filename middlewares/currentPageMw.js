const currentPageMw = {
    currentPage(req, res, next) {
        if (req.path === '/') {
            res.locals.currentPage = 'home'; // Page d'accueil
        } else if (req.path === '/catalogue') {
            res.locals.currentPage = 'catalog'; // Page à propos
        } else if (req.path === '/boutique') {
            res.locals.currentPage = 'shop'; // Page à propos
        } else {
            res.locals.currentPage = ''; // Valeur par défaut
        }
        next();
    }
}

export default currentPageMw;

