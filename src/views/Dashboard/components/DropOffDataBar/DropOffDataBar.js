import React from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import { HorizontalBar } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
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

const DropOffDataBar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  let quizAnalytics;

  if (localStorage.getItem('quizAnalytics')) {
    quizAnalytics = JSON.parse(localStorage.getItem('quizAnalytics'));
    console.log(quizAnalytics);
  }

  const data = {
    datasets: [
      {
        data: [
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.dropEmail)
            : props.drop_email,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedAfterSelfie)
            : props.front_selfie,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedNoSelfieCorrecting)
            : props.no_front_selfie_edit,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedSelfieCorrecting)
            : props.front_selfie_edit,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedHairThickness)
            : props.hair_thickness,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedHairCondition)
            : props.hair_condition,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedHairGoals)
            : props.hair_goals,
          localStorage.getItem('quizAnalytics')
            ? parseInt(quizAnalytics.droppedGeofactors)
            : props.weather
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
    labels: [
      'Name/Email',
      'Selfie',
      'No Selfie/Answering',
      'Selfie/Correcting',
      'Thickness',
      'Conditions',
      'Goals',
      'Geofactors'
    ]
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
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
  //     title: 'Email',
  //     value: '63',
  //     icon: <LaptopMacIcon />,
  //     color: theme.palette.primary.main
  //   },
  //   {
  //     title: 'Selfie',
  //     value: '15',
  //     icon: <TabletMacIcon />,
  //     color: theme.palette.error.main
  //   },
  //   {
  //     title: 'No Selfie/Correcting',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Selfie/Correcting',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Thickness',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Conditions',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Goals',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   },
  //   {
  //     title: 'Geofactors',
  //     value: '23',
  //     icon: <PhoneIphoneIcon />,
  //     color: theme.palette.warning.main
  //   }
  // ];

  return (
    <ApiContextConsumer>
      {context => (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardHeader title="QUIZ DROP OFF" />
          <Divider />
          <CardContent>
            <div className={classes.chartContainer}>
              <HorizontalBar
                data={data}
                options={options}
              />
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

DropOffDataBar.propTypes = {
  className: PropTypes.string
};

export default DropOffDataBar;
