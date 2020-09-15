const graphql = require("graphql")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
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
      email: {type: GraphQLString},
      password: {type: GraphQLString},
   })
})


const Query = new GraphQLObjectType({
   name: "QueryType",
   fields: {
      user: {
         type: UserType,
         args: {
            id: {type: GraphQLID}
         },
         resolve(parents, args){
            return User.findById(args.id)
         }
      },
      login:{
         type: UserType,
         args: {
            email: {type: GraphQLString},
            password: {type: GraphQLString}
         },
         async resolve(parents, args) {
            //check if the email exists  
            const userExists = await User.findOne({ email: args.email })
            //check if the password is valid 
            const validPass = await bcrypt.compare(args.password, userExists.password )

            if(userExists && validPass){
               return User.findOne({ email: args.email })
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
            email: {type: GraphQLString},
            password: {type: GraphQLString}
         },
         async resolve(parents, args) {
            //check if the email exists
            const userExists = await User.findOne({ email: args.email })
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(args.password, salt)

            let newUser = new User({
               name: args.name,
               email: args.email,
               password: hashedPassword
            })
            if (userExists) {
               return User.findOne({ email: args.email })
            } else {
               return newUser.save()
            }
         }
      },
      // login: {
      //    type: UserType,
      //    args: {
      //       email: {type: GraphQLString},
      //       password: {type: GraphQLString}
      //    },
      //    async resolve(parents, args) {
      //       //check if the email exists  
      //       const userExists = await User.findOne({ email: args.email })
      //       //check if the password is valid 
      //       const validPass = await bcrypt.compare(args.password, userExists.password )


      //       if(userExists && validPass){
      //          return User.findOne({ email: args.email })
      //       }
      //    }
      // }
   }
})

module.exports = new GraphQLSchema({
   query: Query,
   mutation: Mutation
})