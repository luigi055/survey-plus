const stripe = require ('stripe') (process.env.STRIPE_SECRET_KEY);
const auth = require ('./../middlewares/auth');

module.exports = app => {
  app.post ('/api/stripe', auth, async (req, res) => {
    const {id, email, card: {brand, exp_month, exp_year, funding}} = req.body;
    try {
      const charge = await stripe.charges.create ({
        amount: 500,
        currency: 'usd',
        source: id, // obtained with Stripe.js
        description: '5$ for 5 credits',
      });
      // req.user comes automatically from passport.js
      // passport looks for the cookies and find the user
      req.user.credits += 5;
      const user = await req.user.save ();

      res.send (user);
    } catch (err) {
      res.status (400).send (err);
      console.log (err);
    }
  });
};
