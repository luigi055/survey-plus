module.exports = (req, res, next) => {
  if (!req.user) {
    // stop execution and return 401 status if there is not a user loggedin
    return res.status (401).send ({
      error: 'you must log in!',
    });
  }

  next ();
};
