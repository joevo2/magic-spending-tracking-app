import React from "react";
import { View, StyleSheet, ScrollView, Text, Platform } from "react-native";

export default class HomeScreen extends React.Component {
  // React navigation
  static navigationOptions = {
    title: "Spending App"
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
        <View style={styles.tabBarInfoContainer}>
          <Text
            style={{
              fontWeight: "bold",
              backgroundColor: "red"
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              backgroundColor: "blue"
            }}
          >
            RM 10
          </Text>
        </View>
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
  },
  tabBarInfoContainer: {
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
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
    paddingHorizontal: 10
  }
});
