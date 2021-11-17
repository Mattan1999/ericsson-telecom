import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Icon } from "react-native-elements";

export default function NetworkDisplay() {
  const netInfo = useNetInfo();
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type);
  });
  return (
    <View style={styles.container}>
      <NetworkType type={netInfo.type} />
      <NetworkIsConnected isConnected={netInfo.isConnected} />
      <NetworkHasInternet isInternetReachable={netInfo.isInternetReachable} />
      <NetworkDetails type={netInfo.type} details={netInfo.details} />
    </View>
  );
}

function NetworkType(props) {
  return <Text>Type: {props.type}</Text>;
}

function NetworkIsConnected(props) {
  if (props.isConnected !== null && props.isConnected !== undefined) {
    return (
      <View style={styles.container2}>
        <Text>Connected</Text>
        <StatusIcon boolean={props.isConnected} />
      </View>
    );
  } else return null;
}

function NetworkHasInternet(props) {
  if (
    props.isInternetReachable !== null &&
    props.isInternetReachable !== undefined
  ) {
    return (
      <View style={styles.container2}>
        <Text>Internet</Text>
        <StatusIcon boolean={props.isInternetReachable} />
      </View>
    );
  } else return null;
}

function NetworkDetails(props) {
  const type = props.type;
  const details = props.details;
  if (type === "none" || type === "unknown") return <Text>No details</Text>;
  else if (type === "wifi") return <Text>WIFI</Text>;
  else if (type === "cellular") return <Text>cellular</Text>;
  else
    return (
      <Text>
        isConnectionExpensive: {details.isConnectionExpensive.toString()}
      </Text>
    );
}

function StatusIcon(boolean) {
  if (boolean) return <Icon name="check" type="evilicon" color="#00FF00" />;
  return <Icon name=":cross-mark" type="evilicon" color="#ff0000" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
  },
});
