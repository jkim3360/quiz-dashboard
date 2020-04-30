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
    weather: null
  };

  async componentDidMount() {
    this.fetchKlaviyoEmails();
    this.fetchUserData();

    // localStorage.setItem('userData', JSON.stringify(userData));
  }

  fetchKlaviyoEmails = async () => {
    const klaviyoEmails = await axios(
      `https://bespoke-backend.herokuapp.com/klaviyo-emails?apikey=${REACT_APP_API_KEY}`
    );
    this.setState({
      emailCount: klaviyoEmails.data.total_quiz_emails
    });
  };

  fetchUserData = async () => {
    const userData = await axios.get(
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dev-backend-obdyi/service/Zapier/incoming_webhook/webhook0'
    );

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
    }
    console.log(
      drop_email,
      front_selfie,
      no_front_selfie_edit,
      front_selfie_edit,
      hair_thickness,
      hair_condition,
      hair_goals,
      weather
    );

    await this.fetchQuizOrders();

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
    console.log(this.state.completedConversion);
  };

  fetchQuizOrders = async () => {
    const orders = await axios(
      'https://bespoke-backend.herokuapp.com/quiz-orders?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO'
    );
    const orderCount = orders.data.length;
    this.setState({
      orderCount
    });
    console.log(orderCount);
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { ApiContextProvider, Consumer as ApiContextConsumer };
