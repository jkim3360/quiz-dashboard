import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ApiContextConsumer } from '../../context/ApiContext';

import {
  Klaviyo,
  TotalUsers,
  CompletedQuizCount,
  TotalProfit,
  LatestSales,
  DropOffData,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <ApiContextConsumer>
      {context => (
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Klaviyo />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalUsers />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <CompletedQuizCount />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProfit />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestSales />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <DropOffData
              drop_email={context.drop_email}
              front_selfie={context.front_selfie}
              no_front_selfie_edit={context.no_front_selfie_edit}
              front_selfie_edit={context.front_selfie_edit}
              hair_thickness={context.hair_thickness}
              hair_condition={context.hair_condition}
              hair_goals={context.hair_goals}
              weather={context.weather}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <LatestProducts />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestOrders />
            </Grid>
          </Grid>
        </div>
      )}
    </ApiContextConsumer>
  );
};

export default Dashboard;
