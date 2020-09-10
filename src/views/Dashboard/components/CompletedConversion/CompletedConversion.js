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
  LinearProgress,
  CircularProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.primary.contrastText,
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

const CompletedQuizCount = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  let quizAnalytics;
  if (JSON.parse(localStorage.getItem('quizAnalytics'))) {
    quizAnalytics = JSON.parse(localStorage.getItem('quizAnalytics'));
  }

  return (
    <ApiContextConsumer>
      {context => (
        <Card {...rest} className={clsx(classes.root, className)}>
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2">
                  COMPLETED CON.
                </Typography>
                <Typography variant="h3">
                  {!context.completedQuizCount &&
                  !context.completedQuizCount ? (
                    quizAnalytics ? (
                      quizAnalytics.completedConversion
                    ) : (
                      <CircularProgress />
                    )
                  ) : (
                    (context.completedConversion * 100).toFixed(2) + '%'
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <InsertChartIcon className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
            <LinearProgress
              className={classes.progress}
              value={(context.completedQuizCount / context.quizCount) * 100}
              variant="determinate"
            />
            <Typography className={classes.caption} variant="caption">
              {localStorage.getItem('quizAnalytics')
                ? quizAnalytics.completed
                : context.completedQuizCount}{' '}
              out of{' '}
              {localStorage.getItem('quizAnalytics')
                ? quizAnalytics.quizCount
                : context.quizCount}{' '}
              users completed quiz
            </Typography>
          </CardContent>
        </Card>
      )}
    </ApiContextConsumer>
  );
};

CompletedQuizCount.propTypes = {
  className: PropTypes.string
};

export default CompletedQuizCount;
