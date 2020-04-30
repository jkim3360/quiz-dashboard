import React from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
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
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.white,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TotalProfit = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  let droppedQuizCount;
  if (JSON.parse(localStorage.getItem('quizAnalytics'))) {
    droppedQuizCount = JSON.parse(localStorage.getItem('quizAnalytics'))
      .droppedQuizCount;
  }

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
                  {!context.droppedQuizCount
                    ? droppedQuizCount || <CircularProgress />
                    : context.droppedQuizCount}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <ErrorOutline className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>{' '}
            <LinearProgress
              className={classes.progress}
              value={(context.droppedQuizCount / context.quizCount) * 100}
              variant="determinate"
            />
            <Typography
              className={classes.caption}
              variant="caption"
            >
              Did not reach payoff page{' '}
            </Typography>
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
