import React, { useState } from 'react';
import { ApiContextConsumer } from '../../../../context/ApiContext';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';


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


const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(14);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
    // console.log(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

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
                          <TableSortLabel>Date</TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {context.quizOrdersArr
                      .slice(
                        page === 0 ? 0 : rowsPerPage * page,
                        page === 0 ? rowsPerPage : rowsPerPage * (page + 1)
                      )
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
                            {new Date(order.orderCreated).toDateString()}
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
            <TablePagination
              component="div"
              count={context.quizOrdersArr.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
            />
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
