import React, { Component } from 'react';
import axios from 'axios';

const { Provider, Consumer } = React.createContext();
const apiPrefix =
  process.env.REACT_APP_BACKEND_HOST ||
  'https://bespoke-backend.herokuapp.com/';
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const REACT_APP_MONGO_DB_WEBHOOK = process.env.REACT_APP_MONGO_DB_WEBHOOK;

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
    userListData: [],
    variants: [],
    totalSales: 0
  };

  async componentDidMount() {
    this.fetchKlaviyoEmails();
    this.fetchShopifyOrders();
    this.fetchUserData();
    // localStorage.setItem('userData', JSON.stringify(userData));s
  }

  fetchKlaviyoEmails = async () => {
    const klaviyoEmails = await axios(
      apiPrefix + `klaviyo-emails?apikey=${REACT_APP_API_KEY}`
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
    let quizOrdersRes = await axios.get(
      apiPrefix + `quiz-orders?apikey=${REACT_APP_API_KEY}`
    );

    let totalSales = 0;
    let quizOrdersArr = [];
    for (let order of quizOrdersRes.data) {
      totalSales += order.total_price;
      let orderObj = {
        orderId: order.order_id,
        number: order.number,
        email: order.email,
        orderCreated: order.order_created,
        totalPrice: order.total_price
      };
      quizOrdersArr.push(orderObj);
    }

    let variantsRes = await axios.get(
      apiPrefix + `variants?apikey=${REACT_APP_API_KEY}`
    );

    let variantsData = variantsRes.data.products;
    console.log(variantsData);
    const variantIds = [
      4416274399322,
      4415929483354,
      4415932661850,
      4415963660378,
      4415965691994,
      4415969787994,
      4415880134746,
      4415887409242,
      4415894126682,
      4415935578202,
      4415937183834,
      4415944884314,
      4415973064794,
      4415975719002
    ];
    const variants = [];

    for (let variant of variantIds) {
      for (let variantData of variantsData) {
        if (variant === variantData.id) {
          variants.push({
            id: variantData.id,
            img: variantData.image,
            title: variantData.title
          });
        }
      }
    }

    console.log(variants);
    this.setState({
      quizOrdersArr: quizOrdersArr.reverse(),
      variants,
      totalSales
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

    this.fetchLineItems(quizOrdersRes);
  };

  fetchLineItems = response => {
    let brilliantGlossShampoo = 0;
    let brilliantGlossConditioner = 0;
    let brilliantGlossCreme = 0;
    let superStrShampoo = 0;
    let superStrConditioner = 0;
    let superStrBalm = 0;
    let techColorShampoo = 0;
    let techColorConditioner = 0;
    let techColorMask = 0;
    let fullBlownShampoo = 0;
    let fullBlownConditioner = 0;
    let fullBlownMist = 0;
    let babyBlondeShampoo = 0;
    let babyBlondeCreme = 0;

    let allLineItems = [];
    for (let i = 0; i < response.data.length; i++) {
      let lineItemsList = response.data[i].line_items;
      for (let j = 0; j < lineItemsList.length; j++) {
        allLineItems.push(lineItemsList[j]);
      }
    }

    allLineItems.map(e => {
      if (
        e.toLowerCase().includes('brilliant gloss shampoo - 8.5 oz') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        brilliantGlossShampoo = brilliantGlossShampoo + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('brilliant gloss conditioner - 8.5 oz') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        brilliantGlossConditioner =
          brilliantGlossConditioner + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('brilliant gloss multi-tasker perfecting') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        brilliantGlossCreme = brilliantGlossCreme + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('super strength shampoo') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        superStrShampoo = superStrShampoo + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('super strength conditioner') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        superStrConditioner = superStrConditioner + parseInt(splitItem[1]);
      } else if (
        (e
          .toLowerCase()
          .includes('super strength roots-to-ends strengthening balm') ||
          e
            .toLowerCase()
            .includes('super strength roots-to-end strengthening balm')) &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        superStrBalm = superStrBalm + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('technician color shampoo - 8.5 oz') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        techColorShampoo = techColorShampoo + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('technician color conditioner - 8.5 oz') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        techColorConditioner = techColorConditioner + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('technician color powerful flash mask') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        techColorMask = techColorMask + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('full blown volume shampoo') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        fullBlownShampoo = fullBlownShampoo + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('full blown volume conditioner') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        fullBlownConditioner = fullBlownConditioner + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('full blown volume dry texturizing mist') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        fullBlownMist = fullBlownMist + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('baby blonde shampoo') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        babyBlondeShampoo = babyBlondeShampoo + parseInt(splitItem[1]);
      } else if (
        e.toLowerCase().includes('baby blonde air-dry') &&
        e.toLowerCase().indexOf('sample') === -1
      ) {
        let splitItem = e.split(',  qty: ');
        babyBlondeCreme = babyBlondeCreme + parseInt(splitItem[1]);
      }
    });

    const lineItems = {
      brilliantGlossShampoo: brilliantGlossShampoo,
      brilliantGlossConditioner: brilliantGlossConditioner,
      brilliantGlossCreme: brilliantGlossCreme,
      superStrShampoo: superStrShampoo,
      superStrConditioner: superStrConditioner,
      superStrBalm: superStrBalm,
      techColorShampoo: techColorShampoo,
      techColorConditioner: techColorConditioner,
      techColorMask: techColorMask,
      fullBlownShampoo: fullBlownShampoo,
      fullBlownConditioner: fullBlownConditioner,
      fullBlownMist: fullBlownMist,
      babyBlondeShampoo: babyBlondeShampoo,
      babyBlondeCreme: babyBlondeCreme
    };

    localStorage.setItem('lineItems', JSON.stringify(lineItems));

    this.setState({
      lineItems
    });
  };

  fetchUserData = async () => {
    const userData = await axios.get(`${REACT_APP_MONGO_DB_WEBHOOK}`);

    console.log(JSON.stringify(userData));

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
      JSON.stringify(userListData.reverse().slice(0, 1800))
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
