import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { voteBlog } from '../reducers/blogReducer'

const BlogList = (user) => {
    const blogs = useSelector((state) => state.blogs)
    console.log(blogs)

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user} //fix later
                />
            ))}
        </div>
    )
}

export default BlogList
