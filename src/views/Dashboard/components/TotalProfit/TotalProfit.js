import React from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.error.white,
    color: theme.palette.primary
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.error.dark,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalProfit = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <ApiContextConsumer>
      {context => (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardContent>
            <Grid
              container
              justify="space-between"
            >
              <Grid item>
                <Typography
                  className={classes.title}
                  color="inherit"
                  gutterBottom
                  variant="body2"
                >
                  DROPPED QUIZ COUNT
                </Typography>
                <Typography
                  color="inherit"
                  variant="h3"
                >
                  {!context.droppedQuizCount ? (
                    <CircularProgress />
                  ) : (
                    context.droppedQuizCount
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <ErrorOutline className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </ApiContextConsumer>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
