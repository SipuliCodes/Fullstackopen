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

		expect(response.body.length).toEqual(helper.initialBlogs.length + 1)
	})

	test('added blog is in json format', async () => {
		await api
			.post('/api/blogs')
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
