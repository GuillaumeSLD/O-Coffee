const metaDescMw = {
    metaDescription(req, res, next) {
        res.locals.metaDescription = "O'Coffee, votre boutique d'experts du café dans les Hauts-de-Cloques";
        next();
    }
}

export default metaDescMw;