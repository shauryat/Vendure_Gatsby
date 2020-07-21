import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/styles';

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
            <ThemeProvider theme={theme}>
            <Header/>
                <main>{children}</main>
                <footer>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href='https://www.vendure.io'>Vendure</a>
                </footer>
              </ThemeProvider>
            </>
  )
 }
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
