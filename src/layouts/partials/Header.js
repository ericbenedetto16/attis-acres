import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNav } from '../../redux/actions';
import '../assets/css/header.css';

const Header = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const toggled = useSelector((state) => state.toggleNav);
  const menu = useSelector((state) => state.menu);
  const header_photo = useSelector((state) => state.header_photo);

  return (
    <>
      <header>
        <Link to="/wpTest/" className="header-logo">
          { !loading ? <img src={header_photo[0].source_url} alt="Logo" /> : 'Loading...' }
        </Link>
        <div className="nav-wrapper">
          <nav className="nav-header-main">
            <ul>
              {menu.map(
                (item, iteration) => (
                  <li key={iteration}><Link to={item.url.replace('http://localhost/', '/')}>{item.title}</Link></li>
                ),
              )}
            </ul>
          </nav>
          <div className="btn-toggle-nav">
            <div className="btn-toggle-nav-img" onClick={() => dispatch(toggleNav(toggled))} />
          </div>
        </div>
      </header>
      { toggled
        ? (
          <aside className="nav-header-mobile">
            <ul>
              {menu.map(
                (item, iteration) => (
                  <li key={iteration}><Link to={item.url.replace('http://localhost/', '/')}>{item.title}</Link></li>
                ),
              )}
            </ul>
          </aside>
        )
        : ''}
    </>
  );
};

export default Header;
