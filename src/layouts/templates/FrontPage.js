import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NotFound from './404';

const FrontPage = () => {
  const loading = useSelector((state) => state.loading);
  const pages = useSelector((state) => state.pages);
  let rendered;

  const setCacheInvalid = () => {
    localStorage.setItem('eb-cache-updated', '1990-1-1:00-00-00');
    window.location.reload();
  };

  if (!loading) {
    const page = pages.filter((p) => p.slug === 'home');
    if (page) {
      rendered = page[0].content.rendered;
      return (
        <>
          <Redirect to="/wpTest/" />
          <div id="refresh">
            <button type="button" onClick={setCacheInvalid}>
Last Updated:
              {' '}
              {localStorage.getItem('eb-cache-updated').split(':')[1].replace(/-/g, ':')}
              {' '}
Refresh
            </button>
          </div>
          <div className="front-page">
            { /* eslint-disable-next-line react/no-danger */ }
            <div className="content-area" dangerouslySetInnerHTML={{ __html: rendered }} />
          </div>
        </>
      );
    }
    rendered = <NotFound />;
    return rendered;
  }
  return 'Loading...';
};

export default FrontPage;
