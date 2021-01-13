import React from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import { Bar } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px',
    marginTop: '20px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const LengthData = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  let quizAnalytics;

  if (localStorage.getItem('quizAnalytics')) {
    quizAnalytics = JSON.parse(localStorage.getItem('quizAnalytics'));
  }

  const data = {
    datasets: [
      {
        data: [
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.short)
            : props.short,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.long)
            : props.long,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.chin_length)
            : props.chin_length,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.shoulder_length)
            : props.shoulder_length
        ],
        backgroundColor: [
          theme.palette.secondary.light,
          theme.palette.success.light,
          theme.palette.warning.light,
          theme.palette.error.light,
          theme.palette.secondary.main,
          theme.palette.success.dark,
          theme.palette.warning.dark,
          theme.palette.error.dark,
          theme.palette.warning.dark
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Short', 'Chin Length', 'Shoulder Length', 'Long']
  };

  const options = {
    title: {
      display: false,
      text: 'Legend',
      fontSize: 15
    },
    legend: {
      display: true,
      position: 'bottom',
      fullWidth: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 0,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  // const devices = [
  //   {
  //     title: 'Desktop',
  //     value: '63',
  //     icon: <LaptopMacIcon />,
  //     color: theme.palette.primary.main
  //   },
  //   {
  //     title: 'Tablet',
  //     value: '15',
  //     icon: <TabletMacIcon />,
  //     color: theme.palette.error.main
  //   },
  //   {
  //     title: 'Mobile',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   }
  // ];

  return (
    <ApiContextConsumer>
      {context => (
        <Card {...rest} className={clsx(classes.root, className)}>
          <CardHeader title="LENGTH" />
          <Divider />
          <CardContent>
            <div className={classes.chartContainer}>
              <Bar data={data} options={options} />
            </div>
            <div className={classes.stats}>
              {/* {devices.map(device => (
                <div
                  className={classes.device}
                  key={device.title}
                >
                  <span className={classes.deviceIcon}>{device.icon}</span>
                  <Typography variant="body1">{device.title}</Typography>
                  <Typography
                    style={{ color: device.color }}
                    variant="h2"
                  >
                    {device.value}%
                  </Typography>
                </div>
              ))} */}
            </div>
          </CardContent>
        </Card>
      )}
    </ApiContextConsumer>
  );
};

LengthData.propTypes = {
  className: PropTypes.string
};

export default LengthData;
