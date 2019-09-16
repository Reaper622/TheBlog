import axios from 'axios'

// TYPE
const UPLOAD_BLOGS = 'UPLOAD_BLOGS'


// 初始state
const initState = {

}

// reducer
export function reducer(state=initState, action) {
  switch(action.type){
    case UPLOAD_BLOGS: {
      return {...state, blogs: action.payload}
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
          payload: res.data.blogs
        })
      })
  }
}