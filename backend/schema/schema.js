const graphql = require("graphql")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const validationSchema = require("./validation")
const User = require("../models/user")

dotenv.config()

const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLString,
   GraphQLInt,
   GraphQLList,
   GraphQLNonNull,
   GraphQLSchema
} = graphql

const UserType = new GraphQLObjectType({
   name: "User",
   fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      username: {type: GraphQLString},
      email: {type: GraphQLString},
      password: {type: GraphQLString}
   })
})

const AuthType = new GraphQLObjectType({
   name: "Auth",
   fields: () => ({
      token: {type: GraphQLString},
      user: {
         type: UserType,
         resolve(parents, args){
            return parents.user
         }
      }
   })
})


const createToken = (user) => {
   const token = jwt.sign({ _id: user.id }, process.env.AUTH_TOKEN)
   return token
}



const Query = new GraphQLObjectType({
   name: "QueryType",
   fields: {
      user: {
         type: UserType,
         args: {
            id: {type: GraphQLID},
            token: {type: GraphQLString}
         },
         resolve(parents, args){
            const verified = jwt.verify(args.token, process.env.AUTH_TOKEN)
            return User.findById(args.id)
         }
      },
      login:{
         type: AuthType,
         args: {
            email: {type: GraphQLString},
            password: {type: GraphQLString}
         },
         async resolve(parents, args) {
            //check if the email exists  
            const user = await User.findOne({ email: args.email })
            //check if the password is valid 
            const validPass = await bcrypt.compare(args.password, user.password )
            const token = createToken(user)
            
            if (!validPass){
               throw new Error("Invalid password")
            } else if(user && validPass){
               return {
                  token,
                  user
               }
            }
         }
      }
   }
})

const Mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
      signup: {
         type: UserType,
         args: {
            name: {type: GraphQLString},
            username: {type: GraphQLString},
            email: {type: GraphQLString},
            password: {type: GraphQLString}
         },
         async resolve(parents, args) {
            //check if args are valid
            const validation = validationSchema.validate(args)
            //check if the email exists
            const userExists = await User.findOne({ email: args.email })
            //check if the email exists
            const usernameExists = await User.findOne({ username: args.username })
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(args.password, salt)

            let newUser = new User({
               name: args.name,
               username: args.username,
               email: args.email,
               password: hashedPassword
            })

            if (validation.error) {
               throw new Error(validation.error)
            } else if(usernameExists) {
               throw new Error("username is already used")
            } else if (userExists) {
               throw new Error("User already exists")
            } else if (validation) {
               return newUser.save()
            }
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: Query,
   mutation: Mutation
})