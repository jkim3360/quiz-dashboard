import React from 'react';
import { ApiContextConsumer } from '../../context/ApiContext';
import LineItemsSold from '../Dashboard/components/LineItemsSold';
import LatestOrders from '../Dashboard/components/LatestOrders';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const LineItems = () => {
  const classes = useStyles();

  return (
    <ApiContextConsumer>
      {context => (
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <LatestOrders />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <LineItemsSold
                lineItems={context.lineItems}
                variants={context.variants}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </ApiContextConsumer>
  );
};
export default LineItems;
