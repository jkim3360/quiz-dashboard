import React from 'react';
import { ApiContextConsumer } from '../../context/ApiContext';

import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <ApiContextConsumer>
      {context => (
        <Route
          {...rest}
          render={matchProps => (
            <Layout>
              <Component userListData={context.userListData} {...matchProps} />
            </Layout>
          )}
        />
      )}
    </ApiContextConsumer>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
