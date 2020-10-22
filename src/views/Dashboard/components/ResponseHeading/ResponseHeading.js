import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
// import ErrorOutline from '@material-ui/icons/ErrorOutline';
// import CircularProgress from '@material-ui/core/CircularProgress';

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

const ResponseHeading = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  let droppedQuizCount;
  if (JSON.parse(localStorage.getItem('quizAnalytics'))) {
    droppedQuizCount = JSON.parse(localStorage.getItem('quizAnalytics'))
      .droppedQuizCount;
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Typography
          className={classes.title}
          color="inherit"
          gutterBottom
          variant="body2">
          CUSTOMER RESPONSES
        </Typography>
      </CardContent>
    </Card>
  );
};

ResponseHeading.propTypes = {
  className: PropTypes.string
};

export default ResponseHeading;
