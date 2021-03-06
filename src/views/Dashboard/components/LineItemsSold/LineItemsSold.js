import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  ListItemAvatar,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
// import UsersTable from '../../../UserList/components/UsersTable';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 45,
    width: 45,
    margin: '0 auto'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  }
}));

const LineItemsSold = props => {
  const { className, variants, ...rest } = props;
  const classes = useStyles();

  const [products] = useState(mockData);

  let lineItems = !localStorage.getItem('lineItems')
    ? props.lineItems
    : JSON.parse(localStorage.getItem('lineItems'));

  let newLineItems = [];
  // console.log('new line items: ', newLineItems);
  let lineItemsKeys = props.lineItems ? Object.keys(lineItems) : '';

  for (let i = 0; i < lineItemsKeys.length; i++) {
    let obj = {
      title: variants[i] && variants[i].title,
      img: variants[i] && variants[i].img.src,
      lineItem: lineItemsKeys[i],
      qty: lineItems[lineItemsKeys[i]]
    };
    newLineItems.push(obj);
  }

  // for (let key in lineItems) {
  //   let obj = {
  //     lineItem: key,
  //     qty: lineItems[key]
  //   };
  //   newLineItems.push(obj);
  // }

  // console.log(newLineItems);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Line Items Sold"
      />
      <Divider />
      <CardContent className={classes.content}>
        <Table height={10}>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell sortDirection="desc" />
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              maxHeight: '378px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}>
            {newLineItems.map((product, i) => (
              <TableRow>
                <ListItemAvatar
                  className={classes.avatar}
                  key={product.lineItem}>
                  <img
                    alt="Product"
                    className={classes.image}
                    src={product.img}
                  />
                </ListItemAvatar>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <IconButton edge="end" size="small" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          {/* View all <ArrowRightIcon /> */}
        </Button>
      </CardActions>
    </Card>
  );
};

LineItemsSold.propTypes = {
  className: PropTypes.string
};

export default LineItemsSold;
