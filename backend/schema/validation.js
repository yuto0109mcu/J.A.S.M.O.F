const Joi = require("@hapi/joi")

const passPattern = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$/"

const validation = Joi.object ({
   name: Joi.string().max(30).required(),
   email: Joi.string().min(6).required().email(),
   username: Joi.string().min(4).max(30).alphanum().required(),
   password: Joi.string().regex(/^[a-zA-Z0-9!@#$%&*]{8,30}$/).required()
})

module.exports = validation