import React from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';
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

const ColorData = props => {
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
            ? parseInt(quizAnalytics.blonde)
            : props.blonde,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.brown)
            : props.brown,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.black)
            : props.black,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.red)
            : props.red,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.silver)
            : props.silver
        ],
        backgroundColor: [
          theme.palette.warning.light,
          '#8B4513',
          '#000000',
          theme.palette.error.dark,
          '#C0C0C0'
        ],
        label: ["Hair Color"],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Blonde', 'Brown', 'Black', 'Red', 'Silver']
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
          <CardHeader title="COLOR" />
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

ColorData.propTypes = {
  className: PropTypes.string
};

export default ColorData;
