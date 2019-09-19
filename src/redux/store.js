import axios from 'axios'

// TYPE
const UPLOAD_BLOGS = 'UPLOAD_BLOGS'
const GET_BLOGS_BY_PAGE = 'GET_BLOGS_BY_PAGE'


// 初始state
const initState = {

}

// reducer
export function reducer(state=initState, action) {
  switch(action.type){
    case UPLOAD_BLOGS: {
      return {...state, blogs: action.payload.blogs, blogsCount: action.payload.blogCount}
    }
    case GET_BLOGS_BY_PAGE: {
      return {...state, blogsToShow: action.payload.blogs, blogsCount: action.payload.blogCount}
    }
    default: return state
  }
}

// action creators
// 加载博客
export function loadBlogs() {
  return dispatch => {
    axios.get('http://127.0.0.1:4000/blog/getblogs')
      .then(res => {
        res.data.blogs.map(blog => {
          blog.time = blog.time.split('T')[0]
        })
        dispatch({
          type: UPLOAD_BLOGS,
          payload: res.data
        })
      })
  }
}

// 分页加载博客
export function loadBlogsByPage(page) {
  return dispatch => {
    axios.get(`http://127.0.0.1:4000/blog/getblogs/${page}`)
      .then(res => {
        res.data.blogs.map(blog => {
          blog.time = blog.time.split('T')[0]
        })
        dispatch({
          type: GET_BLOGS_BY_PAGE,
          payload: res.data
        })
      })
  }
}