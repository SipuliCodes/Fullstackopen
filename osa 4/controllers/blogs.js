const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	console.log(req.token)
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token invalid' })
	}
	const user = req.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	const user = req.user
	const userid = user.id
	if (!(blog.user.toString() === userid.toString())) {
		return res.status(401).json({ error: 'permission missing' })
	}
	await Blog.findByIdAndDelete(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body

	const blog = {
		title: body.title,
		author: body.title,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	res.status(201).json(updatedBlog)
})

module.exports = blogsRouter