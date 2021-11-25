import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";

const HeatMapIntervalSettings = () => {
  const [darkGreen, setDarkGreen] = useState(null);
  const [lightGreen, setLightGreen] = useState(null);
  const [yellow, setYellow] = useState(null);
  const [orange, setOrange] = useState(null);
  const [red, setRed] = useState(null);
  const [grey, setGrey] = useState(null);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@test", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@test");
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text style={styles.header}>
        Choose colors for signal strength intervals
      </Text>
      <View style={styles.row}>
        <View style={styles.inputView}>
          <Text style={styles.text}>Dark green</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 80-100"
            value={darkGreen}
            onChangeText={(text) => setDarkGreen(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Light green</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 60-80"
            value={lightGreen}
            onChangeText={(text) => setLightGreen(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Yellow</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 40-60"
            value={yellow}
            onChangeText={(text) => setYellow(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputView}>
          <Text style={styles.text}>Orange</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 20-40"
            value={orange}
            onChangeText={(text) => setOrange(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Red</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 1-20"
            value={red}
            onChangeText={(text) => setRed(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Grey</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 0"
            value={grey}
            onChangeText={(text) => setGrey(text)}
          />
        </View>
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          let intervalValues = {
            darkGreen: darkGreen,
            lightGreen: lightGreen,
            yellow: yellow,
            orange: orange,
            red: red,
            grey: grey,
          };
          storeData(intervalValues);
        }}
      >
        <View style={styles.buttonStyle}>
          <Text style={{ color: "#000000", fontSize: 16 }}>Apply values</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {
          getData();
        }}
      >
        <View style={styles.buttonStyle}>
          <Text style={{ color: "#000000", fontSize: 16 }}>Get values</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default HeatMapIntervalSettings;

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputView: {
    width: 100,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonStyle: {
    width: "90%",
    height: 45,
    backgroundColor: "lightseagreen",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
