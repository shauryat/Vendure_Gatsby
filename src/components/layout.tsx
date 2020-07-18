import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { CssBaseline } from '@material-ui/core';


import Header from './header';
import './style.scss';

/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
const Layout = ({ children }) => {

return (        
            <>
            <CssBaseline/>
              <Header/>
              <div
                  style={{
                    margin: `0 auto`,
                    maxWidth: `1024px`,
                    padding: `0px 1.0875rem 1.45rem`,
                    paddingTop: 0,
                  }}
              >
                <main>{children}</main>
                <footer>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href='https://www.vendure.io'>Vendure</a>
                </footer>
              </div>
            </>
  )
 }
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
