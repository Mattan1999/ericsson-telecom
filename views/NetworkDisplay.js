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
      <WifiIcon wifi={netInfo.isWifiEnabled} />
      <NetworkType type={netInfo.type} />
      <NetworkIsConnected isConnected={netInfo.isConnected} />
      <NetworkHasInternet isInternetReachable={netInfo.isInternetReachable} />
      <NetworkDetails type={netInfo.type} details={netInfo.details} />
    </View>
  );
}

function NetworkType(props) {
  return <Text>Network type: {props.type}</Text>;
}

function NetworkIsConnected(props) {
  const isConnected =
    props.isConnected !== null && props.isConnected !== undefined
      ? props.isConnected
      : false;
  return (
    <View style={styles.container2}>
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
    <View style={styles.container2}>
      <Text>Internet: </Text>
      <StatusIcon boolean={props.isInternetReachable} />
    </View>
  );
}

function NetworkDetails(props) {
  const type = props.type;
  const details = props.details;
  if (type === "none" || type === "unknown") return <Text>No details</Text>;
  else if (type === "wifi" || type === "cellular") {
    return (
      <View>
        {Object.entries(details).map((value, key) => (
          <View key={key} style={styles.container2}>
            <Text>{value[0]}: </Text>
            <StringOrIcon value={value[1]}></StringOrIcon>
          </View>
        ))}
      </View>
    );
  } else
    return (
      <View style={styles.container2}>
        <Text>isConnectionExpensive: </Text>
        <StringOrIcon value={details.isConnectionExpensive}></StringOrIcon>
      </View>
    );
}

function StatusIcon(props) {
  if (props.boolean)
    return <Icon name="check" type="evilicon" color="#00FF00" />;
  else return <Icon name="close" type="evilicon" color="#ff0000" />;
}

function WifiIcon(props) {
  if (props.wifi) return <Icon name="wifi" type="material" color="#000000" />;
  return null;
}

function StringOrIcon(props) {
  if (typeof props.value === "boolean") {
    if (props.value)
      return <Icon name="check" type="evilicon" color="#00FF00" />;
    else return <Icon name="close" type="evilicon" color="#ff0000" />;
  } else return <Text>{props.value.toString()}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
  },
});
