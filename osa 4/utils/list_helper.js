const lodash = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}

	if (blogs.length === 1) {
		return blogs[0].likes
	}

	const initialValue = 0
	return blogs.reduce((likes, blog) => likes + blog.likes, initialValue,)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return ''
	}

	let mostLiked = blogs[0]
	let mostLikes = 0
	for (let i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > mostLikes) {
			mostLiked = blogs[i]
			mostLikes = blogs[i].likes
		}
	}

	return {
		'title': mostLiked.title,
		'author': mostLiked.author,
		'likes': mostLiked.likes
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return ''
	}
	const blogAmounts = lodash.countBy(blogs, 'author')
	const mostBlogs = lodash.maxBy(Object.keys(blogAmounts), author => blogAmounts[author])

	return {
		author: mostBlogs,
		blogs: blogAmounts[mostBlogs]
	}

}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return ''
	}

	const groupedByAuthor = lodash.groupBy(blogs, 'author')

	const combinedLikes = lodash.mapValues(groupedByAuthor, blogs => lodash.reduce(blogs, (likes, blog) => {
		return likes + blog.likes
	}, 0))

	const mostCombinedLikes = lodash.maxBy(Object.keys(combinedLikes), author => combinedLikes[author])

	return {
		author: mostCombinedLikes,
		likes: combinedLikes[mostCombinedLikes]
	}
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}