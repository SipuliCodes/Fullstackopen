const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)

	await User.deleteMany({})

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

		const newUser = {
			username: 'Test',
			name: 'Test Börjesson',
			password: 'abcdef'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'Test',
			password: 'abcdef'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)


		const newBlog = {
			title: 'Book of the year',
			author: 'Writer of the year',
			url: 'url of the year',
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)

		const response = await api.get('/api/blogs')

		expect(response.body.length).toEqual(helper.initialBlogs.length + 1)
	})

	test('added blog is in json format', async () => {
		const newUser = {
			username: 'Test',
			name: 'Test Börjesson',
			password: 'abcdef'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'Test',
			password: 'abcdef'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)


		const newBlog = {
			title: 'Book of the year',
			author: 'Writer of the year',
			url: 'url of the year',
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})

	test('blog not added if no token', async () => {

		const blogsAtStart = helper.initialBlogs

		const newBlog = {
			title: 'Book of the year',
			author: 'Writer of the year',
			url: 'url of the year',
			user: '654354asdsadasd44324asd32'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)

	})
})

describe('testing fields', () => {
	test('likes is zero if not given', async () => {
		const newBlog = {
			title: 'Book of the year',
			author: 'Writer of the year',
			url: 'url of the year'
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
		const newUser = {
			username: 'Test',
			name: 'Test Börjesson',
			password: 'abcdef'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'Test',
			password: 'abcdef'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)

		const newBlog = {
			url: 'url.url.url',
			likes: 90,
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
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

		const updatedBlog = {
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
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

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ro',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		expect(result.body.error).toContain('shorter than the minimum allowed length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper status code and message if password is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'room',
			name: 'Superuser',
			password: 'sa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password is too short')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
