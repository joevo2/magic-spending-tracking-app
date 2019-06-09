import React from "react";

import { View, Text, Button } from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  state = { weather: null };

  // async componentDidMount() {
  //   this.setState({
  //     weather: await fetch(
  //       "https://www.metaweather.com/api/location/search/?query=london"
  //     ).then(res => res.json())
  //   });
  // }

  getWeather = () => {
    const location = 'kuala lumpur'

    // const responds = await fetch(
    //   `https://www.metaweather.com/api/location/search/?query=${location}`
    // );
    // const jsonData = await responds.json();
    // this.setState({
    //   weather: jsonData
    // });


    fetch("https://www.metaweather.com/api/location/search/?query=" + location)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ weather: json });
      });
  };

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state.weather)}</Text>
        <Button title="get weather" onPress={this.getWeather} />
      </View>
    );
  }
}
