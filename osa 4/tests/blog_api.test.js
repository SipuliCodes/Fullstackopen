const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})
describe('testing get', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('identifier is named id', async () => {
		const response = await api.get('/api/blogs')
		for (let i; i < response.body.length; i++)
			expect(response.body[i].id).toBeDefined()
	})
})

describe('testing post', () => {
	test('blog is added', async () => {
		await api.post('/api/blogs')
		const response = await api.get('/api/blogs')
		console.log(response)

		expect(response.body.length).toEqual(helper.initialBlogs.length + 1)
	})

	test('added blog is in json format', async () => {
		await api
			.post('/api/blogs')
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})
})

describe('testing fields', () => {
	test('likes is zero if not given', async () => {
		const newBlog = {
			title: "Book of the year",
			author: "Writer of the year",
			url: "url of the year"
		}
		await api
			.post('/api/blogs')
			.send(newBlog)

		const blogsAtEnd = await helper.blogsInDb()

		const likes = blogsAtEnd.map(blog => blog.likes)
		for (let i = 0; i < likes.length; i++) {
			expect(likes[i]).toBeGreaterThanOrEqual(0)
		}
	})

	test('blogs without author or title is not added', async () => {
		const newBlog = {
			url: 'url.url.url',
			likes: 90
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('testing delete', () => {
	test('succeeds with 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		expect(blogsAtEnd).not.toContain(blogToDelete)
	})
})

describe('testing updating', () => {
	test('succeeds if likes are changed', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		updatedBlog = {
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 90
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(201)
		
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[0].likes).toEqual(updatedBlog.likes)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
