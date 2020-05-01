import React, { Component } from 'react';
import axios from 'axios';

const { Provider, Consumer } = React.createContext();
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

class ApiContextProvider extends Component {
  state = {
    time: 'Day',
    emailCount: null,
    quizCount: null,
    completedQuizCount: null,
    droppedQuizCount: null,
    front_selfie_count: null,
    no_front_selfie_count: null,
    orderCount: null,
    completedConversion: null,
    drop_email: null,
    front_selfie: null,
    no_front_selfie_edit: null,
    front_selfie_edit: null,
    hair_thickness: null,
    hair_condition: null,
    hair_goals: null,
    weather: null,
    quizOrdersArr: [],
    userCodes: [],
    userListData: []
  };

  async componentDidMount() {
    this.fetchKlaviyoEmails();
    this.fetchShopifyOrders();
    this.fetchUserData();

    // localStorage.setItem('userData', JSON.stringify(userData));s
  }

  fetchKlaviyoEmails = async () => {
    const klaviyoEmails = await axios(
      `https://bespoke-backend.herokuapp.com/klaviyo-emails?apikey=${REACT_APP_API_KEY}`
    );
    this.setState({
      emailCount: klaviyoEmails.data.total_quiz_emails
    });
  };

  fetchShopifyOrders = async () => {
    // orders from Shopify admin API
    // let fekkaiOrders = await axios(
    //   `https://bespoke-backend.herokuapp.com/fekkai?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO`
    // );

    // quiz bundle discount orders from MongoDB
    let quizOrders = await axios.get(
      `https://bespoke-backend.herokuapp.com/quiz-orders?apikey=${REACT_APP_API_KEY}`
    );

    let quizOrdersArr = [];
    for (let order of quizOrders.data) {
      let orderObj = {
        orderId: order.order_id,
        number: order.number,
        email: order.email,
        orderCreated: order.order_created,
        totalPrice: order.total_price
      };
      quizOrdersArr.push(orderObj);
    }
    this.setState({
      quizOrdersArr: quizOrdersArr.reverse()
    });
    // console.log(quizOrdersArr);
    // console.log(quizOrders.data.length);
    // // find all order dates from mongo as unique identifiers
    // const orderIds = [];
    // for (let order of quizOrders.data) {
    //   orderIds.push(order.order_id);
    // }

    // // search for new bundle discount orders (chat quiz)
    // for (let order of fekkaiOrders.data) {
    //   let orderDate = new Date(order.created_at);
    //   let today = new Date();

    //   let lineItemsArr = [];
    //   let discountApplications = [];

    //   for (let i = 0; i < order.discount_applications.length; i++) {
    //     let discountApplication =
    //       order &&
    //       order.discount_applications[i] &&
    //       order.discount_applications[i].title;
    //     if (
    //       // check for today
    //       orderDate.getMonth() === today.getMonth() &&
    //       orderDate.getDate() === today.getDate() &&
    //       discountApplication === 'Discount Bundle' &&
    //       //  check if new order exists in mongo through unique identifer
    //       orderIds.includes(order.id) === false
    //     ) {
    //       console.log(
    //         orderIds.includes(order.id),
    //         order.id,
    //         order.created,
    //         order.discount_applications,
    //         order.email,
    //         order.total_price
    //       );
    //       discountApplications.push(discountApplication);
    //       for (let i = 0; i < order.line_items.length; i++) {
    //         const lineItems =
    //           order.line_items[i].title +
    //           ',  qty: ' +
    //           order.line_items[i].quantity.toString();
    //         lineItemsArr.push(lineItems);
    //       }
    //       const orderObj = {
    //         line_items: lineItemsArr,
    //         discount_applications: discountApplications,
    //         order_id: order.id,
    //         order_created: order.created_at,
    //         number: parseInt(order.number),
    //         email: order.email,
    //         total_price: order.total_price
    //       };
    // axios.post(
    //   "http://bespoke-backend.herokuapp.com/quiz-orders?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO",
    //   orderObj
    // );
    //     console.log('order id not found. posting to db!!');
    //   }
    //   // break to prevent posting lineItems more than once
    //   break;
    // }
    // }
  };

  fetchUserData = async () => {
    const userData = await axios.get(
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dev-backend-obdyi/service/Zapier/incoming_webhook/webhook0'
    );

    // console.log(JSON.stringify(userData));

    const quizCount = userData.data.length;
    let complete = 0;
    let dropped = 0;
    let completedQuizCount = 0;
    let droppedQuizCount = 0;
    let front_selfie_count = 0;
    let no_front_selfie_count = 0;
    let drop_email = 0;
    let front_selfie = 0;
    let no_front_selfie_edit = 0;
    let front_selfie_edit = 0;
    let hair_thickness = 0;
    let hair_condition = 0;
    let hair_goals = 0;
    let weather = 0;
    let userCodes = [];
    let userListData = [];

    for (let user of userData.data) {
      if (user.user_data.compute === true) {
        completedQuizCount++;
      }
      if (user.user_data.compute === false) {
        droppedQuizCount++;
      }
      if (user.user_data.front_selfie !== null) {
        front_selfie_count++;
      } else {
        no_front_selfie_count++;
      }

      if (user.user_data.compute === false) {
        dropped++;
      }
      if (user.user_data.compute === true) {
        complete++;
      }
      //  selfie does not exist and no CV compute characteristics - only email
      else if (user.user_data.email && !user.user_data.answers) drop_email++;
      // selfie exists and any one of the cv data missing - user dropped off after selfie
      else if (
        user.user_data.front_selfie &&
        (!user.user_data.answers.hair_texture ||
          !user.user_data.answers.hair_length ||
          !user.user_data.answers.hair_color)
      )
        front_selfie_edit++;
      // no selfie and at least one cv characterist exists and at least one is missing - user dropped off while editing
      else if (
        !user.user_data.front_selfie &&
        (!user.user_data.answers.hair_texture ||
          !user.user_data.answers.hair_length ||
          !user.user_data.answers.hair_color)
      )
        no_front_selfie_edit++;
      else if (
        user.user_data.front_selfie &&
        !user.user_data.answers.hair_thickness
      )
        front_selfie++;
      //user dropped off before answering any of these questions
      else if (!user.user_data.answers.hair_thickness) hair_thickness++;
      else if (!user.user_data.answers.hair_condition) hair_condition++;
      else if (!user.user_data.answers.hair_goals) hair_goals++;
      // user did not finish quiz at end - same as compute false
      else if (!user.user_data.answers.weather) weather++;

      userCodes.push(user.user_code);

      // for User List View
      if (user.created > '2020-03-20T00:00:00') {
        userListData.push(user);
      }
    }
    localStorage.setItem('userCodes', JSON.stringify(userCodes));
    localStorage.setItem(
      'userListData',
      JSON.stringify(userListData.slice(0, userListData.length / 2))
    );
    this.setState({
      userCodes,
      userListData
    });

    // console.log(
    //   drop_email,
    //   front_selfie,
    //   no_front_selfie_edit,
    //   front_selfie_edit,
    //   hair_thickness,
    //   hair_condition,
    //   hair_goals,
    //   weather
    // );

    const fetchQuizOrders = async () => {
      const orders = await axios(
        `https://bespoke-backend.herokuapp.com/quiz-orders?apikey=${REACT_APP_API_KEY}`
      );
      const orderCount = orders.data.length;
      this.setState({
        orderCount
      });
    };

    await fetchQuizOrders();

    const { orderCount } = this.state;
    this.setState({
      quizCount,
      completedQuizCount,
      droppedQuizCount,
      front_selfie_count,
      no_front_selfie_count,
      completedConversion: orderCount / completedQuizCount,
      drop_email,
      front_selfie,
      no_front_selfie_edit,
      front_selfie_edit,
      hair_thickness,
      hair_condition,
      hair_goals,
      weather
    });

    const { emailCount, quizOrdersArr } = this.state;

    const quizAnalytics = {
      emailCount: emailCount,
      quizCount: quizCount,
      frontSelfieCount: front_selfie_count,
      noFrontSelfieCount: no_front_selfie_count,
      orderCount: quizOrdersArr.length,
      completed: completedQuizCount,
      completedConversion:
        ((quizOrdersArr.length / completedQuizCount) * 100).toFixed(2) + '%',
      totalConversion:
        ((quizOrdersArr.length / quizCount) * 100).toFixed(2) + '%',
      droppedQuizCount: droppedQuizCount,
      dropEmail:
        drop_email +
        ' (' +
        ((drop_email / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedAfterSelfie:
        front_selfie +
        ' (' +
        ((front_selfie / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedNoSelfieCorrecting:
        no_front_selfie_edit +
        ' (' +
        ((no_front_selfie_edit / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedSelfieCorrecting:
        front_selfie_edit +
        ' (' +
        ((front_selfie_edit / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedHairThickness:
        hair_thickness +
        ' (' +
        ((hair_thickness / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedHairCondition:
        hair_condition +
        ' (' +
        ((hair_condition / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedHairGoals:
        hair_goals +
        ' (' +
        ((hair_goals / droppedQuizCount) * 100).toFixed(2) +
        '%)',
      droppedGeofactors:
        weather + ' (' + ((weather / droppedQuizCount) * 100).toFixed(2) + '%)'
    };
    localStorage.setItem('quizAnalytics', JSON.stringify(quizAnalytics));

    if (localStorage.getItem('quizAnalytics')) {
      this.setState({
        quizAnalytics: JSON.parse(localStorage.getItem('quizAnalytics'))
      });
    }
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { ApiContextProvider, Consumer as ApiContextConsumer };
