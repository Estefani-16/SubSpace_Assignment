const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const app = express();

var blogs_retreived = false;

const get_blog_list = async () => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        blogs_retreived = true;
        return response.data.blogs;
    }
    catch (error) {
        console.error("Error fetching the data: ", error);
        return [];
    }
};
get_blog_list();

app.use((req, res, next) => {
    if (!blogs_retreived) {
        res.status(500).json({ error: 'Blog data not available. Please try again later.' });
    } else {
        next();
    }
});

const get_blog_stats = async () => {
    const blogList = await get_blog_list();

    const no_of_blogs = _.size(blogList);
    const longest_title_blog = _.maxBy(blogList, (blog) => blog.title.length);
    const blogs_containing_privacy = _.filter(blogList, (blog) => blog.title.toLowerCase().includes('privacy'));
    const unique_blog_titles = _.uniq(_.map(blogList, 'title'));

    return {
        "no_of_blogs": no_of_blogs,
        "longest_title_blog": longest_title_blog,
        "blogs_containing_privacy": blogs_containing_privacy.length,
        "unique_blog_titles": unique_blog_titles
    };
}

// Cache the function results for 1 minutes 
const cachingPeriod = 60000;
const memoized_get_blog_stats = _.memoize(get_blog_stats, (...args) => JSON.stringify(args), () => Date.now() - cachingPeriod);

// Middleware to catch and handle unhandled errors
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Endpoint to return required data analysis about the blogs 
app.get('/api/blog-stats', async (req, res, next) => {
    try {
        const blogStats = await memoized_get_blog_stats();
        res.json(blogStats);
    } catch (error) {
        next(error);
    }
});

const blog_search = async (keyword) => {

    const blogList = await get_blog_list();

    if (typeof keyword !== 'string') {
        return { error: 'Invalid query parameter. Please provide a valid search keyword.' };
    } else if (keyword.length === 0) {
        return blogList;
    } else {
        const response_blog_search = _.filter(blogList, (blog) =>
            _.includes(blog.title.toLowerCase(), keyword.toLowerCase())
        );

        if (response_blog_search.length === 0)
            return { error: "No blogs for this keyword." };

        return response_blog_search;
    }

};


const memoized_blog_search = _.memoize(blog_search, (keyword) => keyword, () => Date.now() - cachingPeriod);

// Endpoint to implement search functionality 
app.get('/api/blog-search', async (req, res, next) => {
    try {
        const keyword = req.query.keyword;
        const searchResults = await memoized_blog_search(keyword);
        res.json(searchResults);
    } catch (error) {
        next(error);
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});