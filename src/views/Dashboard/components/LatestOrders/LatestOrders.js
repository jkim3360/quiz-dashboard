import React, { useState } from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const [orders] = useState(mockData);

  return (
    <ApiContextConsumer>
      {context => (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardHeader title="Latest Orders" />
          <Divider />
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order No.</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell sortDirection="desc">
                        <Tooltip
                          enterDelay={300}
                          title="Sort"
                        >
                          <TableSortLabel
                            active
                            direction="desc"
                          >
                            Date
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {context.quizOrdersArr
                      .slice(0, 7)
                      .map(order => (
                        <TableRow
                          hover
                          key={order.number}
                        >
                          <TableCell>
                            <a
                              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.orderId}`}
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'black' }}
                              target="_blank"
                            >
                              FK{order.number}
                            </a>
                          </TableCell>
                          <TableCell>{order.email}</TableCell>
                          <TableCell>
                            {/* {moment */}
                            {new Date(order.orderCreated).toDateString()}
                            {/* .format('DD/MM/YYYY')} */}
                          </TableCell>
                          <TableCell>
                            <div className={classes.statusContainer}>
                             
                              {order.totalPrice}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button
              color="primary"
              size="small"
              variant="text"
            >
              View all <ArrowRightIcon />
            </Button>
          </CardActions>
        </Card>
      )}
    </ApiContextConsumer>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
