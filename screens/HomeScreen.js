import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Image,
  FlatList
} from "react-native";

import { Firebase } from "../api/config.js";

class Row extends React.Component {
  render() {
    const { desc, price, onPress, image } = this.props;
    return (
      <View style={styles.cardRow}>
        <Text>{desc}</Text>
        <Text>RM {price}</Text>
        <Image style={{ width: 40, height: 40 }} source={{ uri: image }} />
      </View>
    );
  }
}

export default class HomeScreen extends React.Component {
  // React navigation
  static navigationOptions = {
    title: "Spending App"
  };

  constructor(props) {
    super(props);
    this.state = { items: [{ key: "1" }] };

    const items = Firebase.database().ref("users/" + "john");
    items.on("value", snapshot => {
      const data = snapshot.val();
      const convertedItems = Object.values(data);
      // to convert key into string for React native flat list to render items key
      convertedItems.map((item, index) => (item.key = index.toString()));
      this.setState({ items: convertedItems });
    });
  }

  setData = data => {
    this.setState({ data });
  };

  getSum = data => {
    return data.reduce(
      (accumulator, currrentItem) => accumulator + currrentItem.price,
      0
    );
  };

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

            <FlatList
              data={this.state.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Row
                  desc={item.desc}
                  price={item.price}
                  image={item.image}
                />
              )}
            />
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
