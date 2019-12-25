import axios from 'axios'

// TYPE
const UPLOAD_BLOGS = 'UPLOAD_BLOGS'
const GET_BLOGS_BY_PAGE = 'GET_BLOGS_BY_PAGE'
const UPLOAD_HOTARTICLES = 'UPLOAD_HOTARTICLES'
const UPLOAD_PAGES = 'UPLOAD_PAGES'

// 初始state
const initState = {

}

// reducer
export function reducer (state = initState, action) {
  switch (action.type) {
    case UPLOAD_BLOGS: {
      return { ...state, blogs: action.payload.blogs, blogsCount: action.payload.blogCount }
    }
    case GET_BLOGS_BY_PAGE: {
      return { ...state, blogsToShow: action.payload.blogs, blogsCount: action.payload.blogCount }
    }
    case UPLOAD_HOTARTICLES: {
      return {...state, hotArticles: action.payload}
    }
    case UPLOAD_PAGES: {
      return {...state, showPage: action.payload + 1}
    }
    default: return state
  }
}

// action creators
// 加载博客
export function loadBlogs (data) {
  return dispatch => {
    dispatch({
      type: UPLOAD_BLOGS,
      payload: data
    })
  }
}

// 分页加载博客
export function loadBlogsByPage (data) {
  return dispatch => {
    dispatch({
      type: GET_BLOGS_BY_PAGE,
      payload: data
    })
  }
}

// 加载热榜
export function loadHotArticles (data) {
  return dispatch => {
    dispatch({
      type: UPLOAD_HOTARTICLES,
      payload: data
    })
  }
}

// 首页加载页
export function loadShowPage (data) {
  return dispatch => {
    dispatch({
      type: UPLOAD_PAGES,
      payload: data
    })
  }
}