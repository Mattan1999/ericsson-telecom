import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const DashBoard = () => {
  const netInfo = useNetInfo();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.firstColumn}>
          <Text>Connection type: </Text>
          <Text>SSID: </Text>
          <Text>BSSID: </Text>
          <Text>IP-Adress: </Text>
          <Text>Subnet Mask: </Text>
          <Text>Signal strength: </Text>
          <Text>Carrier name: </Text>
          <Text>Cellular generation: </Text>
          <Text>Network Frequency: </Text>
          {netInfo.details?.isConnectionExpensive !== undefined && (
            <Text>Expensive connection:{" "}</Text>
          )}
        </View>
        <View style={styles.secondColumn}>
          <Text>{netInfo.type}</Text>
          <Text>{netInfo.details?.ssid}</Text>
          <Text>{netInfo.details?.bssid}</Text>
          <Text>{netInfo.details?.ipAddress}</Text>
          <Text>{netInfo.details?.subnet}</Text>
          <Text>{netInfo.details?.strength}</Text>
          <Text>{netInfo.details?.carrier}</Text>
          <Text>{netInfo.details?.cellularGeneration}</Text>
          <Text>{netInfo.details?.frequency}</Text>
          {netInfo.details?.isConnectionExpensive !== undefined && (
            <Text>{netInfo.details?.isConnectionExpensive.toString()}</Text>
          )}
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboard: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 160,
    padding: 20,

    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'lightseagreen',
    borderRadius: 20
  },
  firstColumn: {
    flex: 1,
    alignItems: "flex-end"
  },
  secondColumn: {
    flex: 1,
    
  }
});
