const User = require("../models/user.model");
const { body, validationResult } = require("express-validator"); 

const express = require("express");


const router = express.Router();

//user Crud
router.post("",
    body("first_name")
        .isLength({ min: 3, max: 20 })
        .withMessage("Enter Valid first Name"),

       body("last_name") 
       .isLength({ min: 3, max: 10 })
        .withMessage("Enter Valid  last Name"),

        body("email")
        .isEmail()
        .withMessage("Enter Valid Email Address"),

        body("age")
        .isNumeric()
        .isInt({min:0,max:100})
        .withMessage("Age can't be negative or character"),

        body("gender")
        .isLength({ min:3})
        .isIn(["Male", "Female","Others"])
        .withMessage("Not a valid gender"),

        body("pincode")
        .isLength(equals=6)
        .withMessage("Enter valid six digit pincode"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // let newError = errors.array().map((msg, param, location) => {
            //     return {
            //         [param]: msg,
            //     };
            // });
            return res.status(400).json({ errors: errors.array() });
        }


        try {
            const newUser = await User.create(req.body);



            return res.status(201).json( {newUser} );
        }
        catch (e) {
            //res.status(500).json({ message: e.message, status: "Failed" });
            res.send({e:e.message})


        }

    });


router.get("/", async (req, res) => {

    try {

        const newUser = await User.find({})
            .lean().exec();
        return res.status(201).send({ newUser });

    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});


module.exports = router; 