import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
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
    backgroundColor: theme.palette.primary.main,
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
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  COMPLETED QUIZ CONVERSION
                </Typography>
                <Typography variant="h3">
                  {context.completedQuizCount +
                    ' / ' +
                    (context.completedConversion * 100).toFixed(2) +
                    '%'}
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
              value={context.completedConversion}
              variant="determinate"
            />
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
