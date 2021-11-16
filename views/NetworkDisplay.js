import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import NetInfo, { useNetInfo } from "@react-native-community/netinfo"

export default function NetworkDisplay() {
  const netInfo = useNetInfo()
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type)
  })
  return (
    <View style={styles.container}>
      <NetworkType type={netInfo.type} />
      <NetworkIsConnected isConnected={netInfo.isConnected} />
      <NetworkHasInternet isInternetReachable={netInfo.isInternetReachable} />
      <NetworkDetails type={netInfo.type} details={netInfo.details} />
    </View>
  )
}

function NetworkType(props) {
  return <Text>Type: {props.type}</Text>
}

function NetworkIsConnected(props) {
  if (props.isConnected !== null && props.isConnected !== undefined) {
    return <Text>Is Connected? {props.isConnected.toString()}</Text>
  } else return null
}

function NetworkHasInternet(props) {
  if (
    props.isInternetReachable !== null &&
    props.isInternetReachable !== undefined
  ) {
    return (
      <Text>Is Internet Reachable? {props.isInternetReachable.toString()}</Text>
    )
  } else return null
}

function NetworkDetails(props) {
  const type = props.type
  const details = props.details
  if (type === "none" || type === "unknown") return <Text>"No details"</Text>
  else if (type === "wifi") return <Text>"WIFI"</Text>
  else if (type === "cellular") return <Text>"cellular"</Text>
  else
    return (
      <Text>
        isConnectionExpensive: {details.isConnectionExpensive.toString()}
      </Text>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
