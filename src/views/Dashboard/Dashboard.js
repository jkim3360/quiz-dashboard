import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ApiContextConsumer } from '../../context/ApiContext';

import {
  EmailsCaptured,
  TotalUsers,
  CompletedUsers,
  TotalSales,
  CompletedConversion,
  TotalConversion,
  DroppedQuizCount,
  SelfieCount,
  DropOffDataBar,
  DropOffData,
  ResponseHeading,
  LengthData,
  ColorData,
  TextureData,
  ThicknessData,
  ConditionData,
  GoalData
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
          <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <EmailsCaptured />
            </Grid>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <TotalUsers />
            </Grid>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <CompletedUsers />
            </Grid>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <TotalSales />
            </Grid>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <CompletedConversion />
            </Grid>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <TotalConversion />
            </Grid>
            <Grid item lg={3} sm={6} xl={6} xs={12}>
              <DroppedQuizCount />
            </Grid>
            <Grid item lg={3} sm={6} xl={6} xs={12}>
              <SelfieCount />
            </Grid>
            <Grid item lg={9} md={8} xl={8} xs={12}>
              <DropOffDataBar />
            </Grid>
            <Grid item lg={3} md={4} xl={4} xs={12}>
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
            {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ResponseHeading />
            </Grid> */}
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <TextureData
                straight={context.straight}
                wavy={context.wavy}
                curly={context.curly}
                coily={context.coily}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <LengthData
                short={context.short}
                chin_length={context.chin_length}
                shoulder_length={context.shoulder_length}
                long={context.long}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <ColorData
                blonde={context.blonde}
                brown={context.brown}
                black={context.black}
                red={context.red}
                silver={context.silver}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <ThicknessData
                fine={context.fine}
                medium={context.medium}
                thick={context.thick}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <ConditionData
                fine={context.fine}
                medium={context.medium}
                thick={context.thick}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <GoalData
                color_protect={context.color_protect}
                sooth_calm_scalp={context.sooth_calm_scalp}
                uv_protect={context.uv_protect}
                damage_repair={context.damage_repair}
                frizz_control={context.frizz_control}
                smoothing={context.smoothing}
                healthy_shine={context.healthy_shine}
                hydrate={context.hydrate}
                volumizing={context.volumizing}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12} />
            <Grid item lg={6} md={6} xl={6} xs={6} />
          </Grid>
        </div>
      )}
    </ApiContextConsumer>
  );
};

export default Dashboard;
