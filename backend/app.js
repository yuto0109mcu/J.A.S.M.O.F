const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const app = express()

dotenv.config()

mongoose.connect(
   process.env.DB_CONNECT,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   }
)
mongoose.connection.once("open", () => {
   console.log("Connected to DB")
})

app.use("/graphql", graphqlHTTP({
   schema,
   graphiql: true
}))

app.get("/", (req, res) => {
   res.send("hello world")
})

app.listen(5000, () => {
   console.log("app listening at localserver5000")
})