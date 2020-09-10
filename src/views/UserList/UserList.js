import React  from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersTable } from './components';
// import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = props => {
  const classes = useStyles();

  let userListData = 
  localStorage.getItem('userListData')
    ? JSON.parse(localStorage.getItem('userListData'))
    : 
    props.userListData;
  // console.log(userListData);

  let users = [];

  for (let i = 0; i < userListData.length; i++) {
    let userObj = {
      userCode: userListData[i].user_code ? userListData[i].user_code : '',
      created: userListData[i].created ? userListData[i].created : '',
      selfie: userListData[i].user_data.front_selfie
        ? userListData[i].user_data.front_selfie
        : '',
      name: userListData[i].user_data.name,
      email: userListData[i].user_data.email
        ? userListData[i].user_data.email
        : '',
      city: userListData[i].user_data.weather
        ? userListData[i].user_data.weather &&
          userListData[i].user_data.weather.city
        : ''
    };
    users.push(userObj);
  }

  // const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      {/* <UsersToolbar /> */}
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
