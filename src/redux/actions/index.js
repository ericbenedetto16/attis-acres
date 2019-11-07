export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  payload: posts,
});

export const setMenu = (menu) => ({
  type: 'SET_MENU',
  payload: menu,
});

export const setHeaderPhoto = (link) => ({
  type: 'SET_HEADER_PHOTO',
  payload: link,
});

export const toggleNav = (toggled) => ({
  type: 'TOGGLE_NAV',
  payload: toggled,
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  payload: loading,
});

export const setPages = (pages) => ({
  type: 'SET_PAGES',
  payload: pages,
});

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});
