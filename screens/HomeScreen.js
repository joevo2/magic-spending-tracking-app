import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Button
} from "react-native";

class Row extends React.Component {
  render() {
    const { desc, price, onPress } = this.props;
    return (
      <View style={styles.cardRow}>
        <Text>{desc}</Text>
        <Text>RM {price}</Text>

        {/* <Button
          title="Do something"
          onPress={() => {
            onPress(desc);
          }}
        /> */}
      </View>
    );
  }
}

export default class HomeScreen extends React.Component {
  // React navigation
  static navigationOptions = {
    title: "Spending App"
  };

  state = {};

  setData = data => {
    this.setState({ data });
  };

  getSum = data => {
    return data.reduce((accumulator, currrentItem) => accumulator + currrentItem.price, 0)
  }

  render() {
    const date = new Date();
    const data = [{ desc: "food", price: 1 }, { desc: "food", price: 1 }];
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.card}>
            <View style={styles.cardDate}>
              <Text>{date.toLocaleDateString()}</Text>
            </View>

            {data.map((item, index) => (
              <Row
                key={index}
                desc={item.desc}
                price={item.price}
                onPress={test => {
                  alert(test);
                }}
              />
            ))}
          </View>
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
            RM {this.getSum(data)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "grey"
  },
  contentContainer: {
    // paddingTop: 30,
    // alignItems: "center"
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
  },
  card: {
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  cardDate: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "#f5f5f5"
  },
  cardRow: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da",

    flexDirection: "row",
    justifyContent: "space-between",

    padding: 10
  }
});
