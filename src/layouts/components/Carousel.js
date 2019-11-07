import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, data } = this.props;
    return (
      <div className="preset-content carousel">
        <h1>{title}</h1>
        {data.map(({ link, slug }) => (
          <Link className="carousel-item" to={link.replace('http://localhost/', '/')}>
            <p>{slug}</p>
          </Link>
        ))}
      </div>
    );
  }
}

export default Carousel;
