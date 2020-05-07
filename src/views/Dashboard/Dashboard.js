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
  DropOffDataBar,
  LineItemsSold,
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
              lg={4}
              md={4}
              xl={8}
              xs={12}
            >
              <DropOffDataBar />
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              xl={4}
              xs={12}
            >
              <DropOffData
                drop_email={context.drop_email}
                front_selfie={context.front_selfie}
                front_selfie_edit={context.front_selfie_edit}
                hair_condition={context.hair_condition}
                hair_goals={context.hair_goals}
                hair_thickness={context.hair_thickness}
                no_front_selfie_edit={context.no_front_selfie_edit}
                weather={context.weather}
              />
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xl={6}
              xs={12}
            />
            <Grid
              item
              lg={6}
              md={6}
              xl={6}
              xs={6}
            />
          </Grid>
        </div>
      )}
    </ApiContextConsumer>
  );
};

export default Dashboard;
