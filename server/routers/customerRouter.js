const router = require("express").Router();
const Customer = require("../models/customerModel");
const auth = require("../middleware/auth");

// ***PROTECTED*** //
// the auth function will handle cookie validation ( in the post function )
// only a ogged in user will have access to customers
// the auth middleware will give acces to the req.user value

// create new customer
router.post("/", auth, async (req, res) => {
    try {
        const {name} = req.body;
        const newCustomer = new Customer({name});
        const savedCustomer = await newCustomer.save();

        res.json(savedCustomer);
        

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

// get all customers
router.get("/", auth, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers)
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
})




module.exports = router;