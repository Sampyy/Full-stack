import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)
    console.log(blogs)

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleAddLike={null}
                    handleDelete={null}
                    user={{ name: 'some', username: 'soawea', blogs: [] }} //fix later
                />
            ))}
        </div>
    )
}

export default BlogList
