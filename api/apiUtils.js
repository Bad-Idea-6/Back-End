function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action",
        });
    }

    next();
}
function requireAdmin(req, res, next) {
    if (!req.user.is_admin) {
        next({
            name: "No Admin access found",
            message: "You must be an admin to perform this action",
        });
    }

    next();
}

module.exports = {
    requireUser,requireAdmin
};