import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Platform } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import NetworkDisplay from "../../views/NetworkDisplay.js";
import { Icon } from "react-native-elements";

const DashBoard = () => {
  const netInfo = useNetInfo();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.container}>
          <WifiIcon style={styles.wifi} wifi={netInfo.isWifiEnabled} />
          <NetworkType type={netInfo.type} />
          <NetworkIsConnected isConnected={netInfo.isConnected} />
          <NetworkHasInternet
            isInternetReachable={netInfo.isInternetReachable}
          />
          <NetworkDetails details={netInfo.details} />
          {/* <View style={styles.firstColumn}>
          <Text>Connection type: </Text>
          <Text>Connected: </Text>
          <Text>Has intenet: </Text>
          <Text>SSID: </Text>
          <Text>BSSID: </Text>
          <Text>IP-Adress: </Text>
          <Text>Subnet Mask: </Text>
          <Text>Signal strength: </Text>
          <Text>Carrier name: </Text>
          <Text>Cellular generation: </Text>
          <Text>Network Frequency: </Text>
          <Text>Expensive connection: </Text>
        </View>
        <View style={styles.secondColumn}>
          <TextOrIcon value={netInfo.type}></TextOrIcon>
          <TextOrIcon value={netInfo.isWifiEnabled}></TextOrIcon>
          <TextOrIcon value={netInfo.isInternetReachable}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.ssid}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.bssid}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.ipAddress}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.subnet}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.strength}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.carrier}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.cellularGeneration}></TextOrIcon>
          <TextOrIcon value={netInfo.details?.frequency}></TextOrIcon>
          <TextOrIcon
            value={netInfo.details?.isConnectionExpensive}
          ></TextOrIcon>
        </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

function NetworkType(props) {
  return <Text>Network type: {props.type}</Text>;
}

function NetworkIsConnected(props) {
  const isConnected =
    props.isConnected !== null && props.isConnected !== undefined
      ? props.isConnected
      : false;
  return (
    <View style={styles.singleRow}>
      <Text>Connected: </Text>
      <StatusIcon boolean={isConnected} />
    </View>
  );
}

function NetworkHasInternet(props) {
  const isInternetReachable =
    props.isInternetReachable !== null &&
    props.isInternetReachable !== undefined
      ? props.isInternetReachable
      : false;
  return (
    <View style={styles.singleRow}>
      <Text>Internet: </Text>
      <StatusIcon boolean={isInternetReachable} />
    </View>
  );
}

function NetworkDetails(props) {
  const details = props.details;
  if (details === null) return <Text>No details</Text>;
  else {
    return (
      <View>
        {Object.entries(details).map((value, key) => (
          <View key={key} style={styles.singleRow}>
            <Text>{value[0]}: </Text>
            <TextOrIcon value={value[1]}></TextOrIcon>
          </View>
        ))}
      </View>
    );
  }
}

function StatusIcon(props) {
  if (props.boolean)
    return <Icon name="check" type="evilicon" color="#00FF00" />;
  else return <Icon name="close" type="evilicon" color="#ff0000" />;
}

function WifiIcon(props) {
  if (props.wifi) return <Icon name="wifi" type="material" color="#000000" />;
  else if (props.wifi === false)
    return <Icon name="wifi-off" type="material" color="#000000" />;
  return null;
}

function TextOrIcon(props) {
  console.log(props.value);
  if (props.value === null || props.value === undefined) return <Text>-</Text>;
  else if (typeof props.value === "boolean") {
    return <StatusIcon boolean={props.value} />;
  } else return <Text>{props.value.toString()}</Text>;
}

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textMargin: {
    marginBottom: 5,
  },
  dashboard: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 160,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "lightseagreen",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowOffset: {
          shadowColor: "#000",
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  firstColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  secondColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
  singleRow: {
    flexDirection: "row",
  },
  wifi: {
    alignSelf: "flex-start",
  },
});
