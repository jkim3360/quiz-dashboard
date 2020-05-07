import React from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';import CircularProgress from '@material-ui/core/CircularProgress';

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
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceValue: {
    color: theme.palette.black,
    marginRight: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.info.main,
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

const TotalSales = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // let droppedQuizCount;
  // if (JSON.parse(localStorage.getItem('quizAnalytics'))) {
  //   droppedQuizCount = JSON.parse(localStorage.getItem('quizAnalytics'))
  //     .droppedQuizCount;
  // }
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
                  TOTAL SALES{' '}
                </Typography>
                <Typography
                  color="inherit"
                  variant="h3"
                >
                  {!context.totalSales ? (
                    <CircularProgress />
                  ) : (
                    `$${context.totalSales.toFixed(2)}`
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <MonetizationOnIcon  />
                </Avatar>
              </Grid>
            </Grid>{' '}
            <div className={classes.difference}>
              {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
              <Typography
                className={classes.differenceValue}
                variant="body2"
              >
                03-20-20 Launch{' '}
              </Typography>
            </div>
          </CardContent>
        </Card>
      )}
    </ApiContextConsumer>
  );
};

TotalSales.propTypes = {
  className: PropTypes.string
};

export default TotalSales;
