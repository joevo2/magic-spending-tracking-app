import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  DatePickerAndroid,
  DatePickerIOS,
  TouchableOpacity,
  Button,
  Image
} from "react-native";

import uuid from "uuid";

import { Firebase } from "../api/config.js";

import { ImagePicker, Permissions } from "expo";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add"
  };

  state = { date: new Date(), image: null, imageUploading: false };

  handleAddItem = () => {
    if (this.state.imageUploading) {
      // if image is uploading dont allow
      alert("image is uploading please wait");
    } else {
      Firebase.database()
        .ref("users/" + "john")
        .push({
          desc: this.state.desc || "",
          price: this.state.price || 0,
          date: this.state.date.toLocaleDateString(),
          image: this.state.imageURL
        });
    }
  };

  uploadImageAsync = async uri => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = Firebase.storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
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

        <Button
          title="Pick image"
          onPress={async () => {
            const { status } = await Permissions.askAsync(
              Permissions.CAMERA_ROLL
            );

            if (status === "granted") {
              const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
              });

              if (!result.cancelled) {
                // show image locally, and prevent user from submitting to firebase before uploading complete
                this.setState({ image: result.uri, imageUploading: true });
                try {
                  // Uploading
                  const imageURL = await this.uploadImageAsync(result.uri);
                  this.setState({ imageURL, imageUploading: false });
                } catch (err) {
                  console.error(err);
                }
              }
            }
          }}
        />

        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 200, height: 200 }}
          />
        )}

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
