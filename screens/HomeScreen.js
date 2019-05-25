import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

export default class HomeScreen extends React.Component {
  // React navigation
  static navigationOptions = {
    title: "Spending App",
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={{ fontSize: 30, color: "red", fontWeight: "bold" }}>
            Hello World
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey"
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: "center"
  }
});
