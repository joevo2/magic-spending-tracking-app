import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  DatePickerAndroid,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";

import { Firebase } from "../api/config.js";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add"
  };

  state = { date: new Date() };

  handleAddItem = () => {
    Firebase.database()
      .ref("users/" + "joel")
      .push({
        desc: this.state.desc || '',
        price: this.state.price || 0,
        date: this.state.date.toLocaleDateString()
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Price</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ price: text });
            }}
            style={{ backgroundColor: "pink", width: 100 }}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            onChangeText={text => {
              this.setState({ desc: text });
            }}
            keyboardType="numeric"
            placeholder="description"
            style={{ backgroundColor: "pink", flex: 1 }}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            {Platform.OS === "ios" ? (
              <DatePickerIOS
                date={this.state.date}
                onDateChange={date => this.setState({ date })}
              />
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  const { year, month, day } = await DatePickerAndroid.open({
                    date: new Date()
                  });
                  this.setState({ date: new Date(year, month, day) });
                }}
              >
                <Text>{this.state.date.toString()}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.tabBarStickyBottom}>
          <TouchableOpacity
            onPress={this.handleAddItem}
            style={{ fontWeight: "bold" }}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  tabBarStickyBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
    justifyContent: "center"
  }
});
