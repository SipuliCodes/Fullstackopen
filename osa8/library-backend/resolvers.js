const {GraphQLError} = require('graphql/error')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (author && args.genre) {
        return Book.find({ author: author._id, 'genres': args.genre}).populate('author')
      } else if (!args.genre && author) {
        return await Book.find({ author: author._id}).populate('author')
      } else if (args.genre && !args.author) {
        return await Book.find({'genres': args.genre}).populate('author')
      }
      return await Book.find({}).populate('author')
    } ,
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, {currentUser}) => {

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let author = await Author.findOneAndUpdate({ name: args.author }, { $inc: {bookCount: 1}}, {new: true})
      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          code: 'BAD_USER_INPUT',
          invalidArgs: [args.title, args.published, args.genres],
          error
        })
      }

      pubsub.publish('BOOK_ADDED', {bookAdded: book.populate('author')})

      return book.populate('author')
    },
    editAuthor: async (root, args, { currentUser }) => {
      
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {code: 'BAD_USER_INPUT'}
        })
      }
      const author = await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {new: true})
      if (!author) {
        return null
      }
      
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      console.log(user)
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      
      if (!user || args.password !== '12345qwerty') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers