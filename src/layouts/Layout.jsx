import React, { Fragment } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { css, Global } from '@emotion/core';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import 'typeface-open-sans';
import 'typeface-candal';
import * as components from 'components';
import { NavBar, Footer } from 'layouts';
import theme from '../../config/theme';
import headroom from '../styles/headroom';

const shortcodes = { ...components, '#': 'h1' };
const { SEO } = components;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MDXProvider components={shortcodes}>
      <Fragment>
        <Global
          styles={css`
            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }
            html {
              text-rendering: optimizeLegibility;
              overflow-x: hidden;
              overflow-y: auto;
              box-sizing: border-box;
              -ms-overflow-style: scrollbar;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            html,
            body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }

            body {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              padding: 0 !important;
              overflow: auto !important;
            }
            a {
              color: ${theme.colors.link};
              transition: color 0.5s;
              text-decoration: none;
            }
            a:hover {
              text-decoration: none;
              color: ${theme.colors.linkHover};
            }
            h1 {
              font-family: ${theme.fontFamily.heading};
            }

            ${headroom}
          `}
        />
        <SEO />
        <NavBar />
        {children}
        <Footer />
      </Fragment>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
