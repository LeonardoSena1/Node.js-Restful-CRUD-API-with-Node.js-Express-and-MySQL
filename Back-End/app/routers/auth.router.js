// Import dependencies


module.exports = app => {
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");
    var router = require("express").Router();
    router.post("/", async (req, res) => {
        // Dummy data
        const users = [{ email: "leonardo@leonardo.net", password: "$2b$15$zqY2Q4eOoGzFpZkHJz9HS.BSfXc/HM2E/yTWa1awFmTMgN2bE72Uu", roles: ["admin"] }];
        
        // Get to user from the database, if the user is not there return error
        let user = users.find(u => u.email === req.body.email);
        if (!user) {
            return res.send({
                ok: false,
                msg: "Invalid email or password."
            });
        }

        // Compare the password with the password in the database
        const valid = await bcrypt.compare(req.body.password, user.password)
        if (!valid) {
            return res.send({
                ok: false,
                msg: "Invalid email or password."
            });
        }

        const token = jwt.sign({
            id: user._id,
            roles: user.roles,
        }, "jwtPrivateKey", { expiresIn: "1m" });

        res.send({
            ok: true,
            token: token
        });
    });
    app.use('/api/auth', router);
};
