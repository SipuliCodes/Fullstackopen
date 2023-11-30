const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogsRouter.post('', async (req, res) => {
	const body = req.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0
	})

	const result = await blog.save()
	res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
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