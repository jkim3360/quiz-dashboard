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
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
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
    backgroundColor: theme.palette.warning.light,
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

const SelfieCount = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  let frontSelfieCount;
  if (JSON.parse(localStorage.getItem('quizAnalytics'))) {
    frontSelfieCount = JSON.parse(localStorage.getItem('quizAnalytics'))
      .frontSelfieCount;
  }

  let noFrontSelfieCount;
  if (JSON.parse(localStorage.getItem('quizAnalytics'))) {
    noFrontSelfieCount = JSON.parse(localStorage.getItem('quizAnalytics'))
      .noFrontSelfieCount;
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
                  SELFIE COUNT
                </Typography>
                <Typography
                  color="inherit"
                  variant="h3"
                >
                  {!context.front_selfie_count
                    ? frontSelfieCount || <CircularProgress />
                    : context.front_selfie_count}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <PhotoCameraIcon className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>{' '}
            <LinearProgress
              className={classes.progress}
              value={
                (context.front_selfie_count /
                  (context.front_selfie_count +
                    context.no_front_selfie_count)) *
                100
              }
              variant="determinate"
            />
            <Typography
              className={classes.caption}
              variant="caption"
            >
              {noFrontSelfieCount} out of{' '}
              {frontSelfieCount + noFrontSelfieCount} did not take a selfie{' '}
            </Typography>
          </CardContent>
        </Card>
      )}
    </ApiContextConsumer>
  );
};

SelfieCount.propTypes = {
  className: PropTypes.string
};

export default SelfieCount;
