import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Single = (props) => {
  const loading = useSelector((state) => state.loading);
  let rendered;

  const posts = useSelector((state) => state.posts);

  if (!loading) {
    if (props.match.path === '/wpTest/post/:slug') {
      for (const post of posts) {
        if (post.slug === props.location.pathname.replace('/wpTest/post/', '').replace('/', '')) {
          rendered = post.content.rendered;
          return (
            <div className="single">
              <article className="content-area">
                <h2>{post.title.rendered}</h2>
                <div className="rendered-content" dangerouslySetInnerHTML={{ __html: rendered }} />
              </article>
            </div>
          );
        }
        rendered = '';
      }
      return rendered = <Redirect to="/wpTest/404" />;
    }
  } else {
    return ('Loading...');
  }
};

export default Single;
