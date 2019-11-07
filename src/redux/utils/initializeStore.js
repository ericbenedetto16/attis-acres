import store from '../store';
import {
  setMenu, setPosts, setPages, setProducts, setLoading, setHeaderPhoto,
} from '../actions';
import { validateCache, dateTime } from './cacheValidator';

const initializeStore = async () => {
  const cacheValid = validateCache();
  if (!cacheValid) {
    const headerPhotoRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/media?slug=header-photo');
    const headerPhotoLink = await headerPhotoRes.json();
    store.dispatch(setHeaderPhoto(await headerPhotoLink));

    const menuRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/menu');
    const menuJson = await menuRes.json();
    store.dispatch(setMenu(await menuJson));

    const postsRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/posts');
    const postsJson = await postsRes.json();
    store.dispatch(setPosts(await postsJson));

    const pagesRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/pages');
    const pagesJson = await pagesRes.json();
    store.dispatch(setPages(await pagesJson));

    const productsRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/affiliate-products?_embed');
    const productsJson = await productsRes.json();
    store.dispatch(setProducts(await productsJson));

    localStorage.setItem('eb-cache-updated', dateTime);
  } else {
    const headerPhotoRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/media?slug=header-photo', { cache: 'force-cache' });
    const headerPhotoLink = await headerPhotoRes.json();
    store.dispatch(setHeaderPhoto(await headerPhotoLink));

    const menuRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/menu', { cache: 'force-cache' });
    const menuJson = await menuRes.json();
    store.dispatch(setMenu(await menuJson));

    const postsRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/posts', { cache: 'force-cache' });
    const postsJson = await postsRes.json();
    store.dispatch(setPosts(await postsJson));

    const pagesRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/pages', { cache: 'force-cache' });
    const pagesJson = await pagesRes.json();
    store.dispatch(setPages(await pagesJson));

    const productsRes = await fetch('http://localhost/wpTest/wp-json/wp/v2/affiliate-products?_embed', { cache: 'force-cache' });
    const productsJson = await productsRes.json();
    store.dispatch(setProducts(await productsJson));
  }

  await store.dispatch(setLoading(false));
};

export default initializeStore;
