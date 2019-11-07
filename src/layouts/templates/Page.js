import React from 'react';
import { useSelector } from 'react-redux';
import NotFound from './404';

const Page = (props) => {
  const loading = useSelector((state) => state.loading);
  let rendered;

  const pages = useSelector((state) => state.pages);

  if (!loading) {
    if (props.match.path === '/wpTest/:slug') {
      const page = pages.filter((p) => p.slug === props.location.pathname.replace('/wpTest/', '').replace('/', ''));
      if (page) {
        rendered = page[0].content.rendered;
        return (
          <div className="single">
            { /* eslint-disable-next-line react/no-danger */ }
            <div className="content-area" dangerouslySetInnerHTML={{ __html: rendered }} />
          </div>
        );
      }
      rendered = <NotFound />;

      return rendered;
    }
  }
  return ('Loading...');
};

export default Page;
