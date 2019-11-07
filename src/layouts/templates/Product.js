/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from './404';

const Product = (props) => {
  const loading = useSelector((state) => state.loading);
  const products = useSelector((state) => state.products);
  let rendered;


  if (!loading) {
    if (props.match.path === '/wpTest/products/') {
      return (products.map((item) => (
        <Link to={item.link.replace('http://localhost/wpTest/products/', '')}>{item.slug}</Link>
      )));
    }

    if (props.match.path === '/wpTest/products/:slug') {
      const product = products.filter((p) => p.slug === props.location.pathname.replace('/wpTest/products/', '').replace('/', ''));
      if (product) {
        rendered = product[0].custom_data.description;
        return (
          <div className="single">
            { /* eslint-disable-next-line react/no-danger */ }
            <div className="content-area" dangerouslySetInnerHTML={{ __html: rendered }} />
            {
              product[0]._embedded !== undefined
                ? <img src={product[0]._embedded['wp:featuredmedia'][0].source_url} alt="thumbnail" />
                : ''
            }
          </div>
        );
      }
      rendered = <NotFound />;
      return rendered;
    }
  }
  return ('Loading...');
};

export default Product;
