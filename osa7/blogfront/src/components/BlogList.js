import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import Blog from './Blog'
import { voteBlog } from '../reducers/blogReducer'

const BlogList = (user) => {
    const blogs = useSelector((state) => state.blogs)
    console.log(blogs)

    return (
        <div>
            <Table striped bordered hover>
                <tbody>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user} //fix later
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default BlogList
