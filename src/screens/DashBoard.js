import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const DashBoard = () => {
  const netInfo = useNetInfo();

  return (
    <SafeAreaView>
      <Text>Connection type: {netInfo.type}</Text>
      <Text>SSID: {netInfo.details?.ssid}</Text>
      <Text>BSSID: {netInfo.details?.bssid}</Text>
      <Text>IP-Adress: {netInfo.details?.ipAddress}</Text>
      <Text>Subnet Mask: {netInfo.details?.subnet}</Text>
      <Text>Signal strength: {netInfo.details?.strength}</Text>
      <Text>Carrier name: {netInfo.details?.carrier}</Text>
      <Text>Cellulur generation: {netInfo.details?.cellularGeneration}</Text>
      <Text>Network Frequency: {netInfo.details?.frequency}</Text>
      {netInfo.details?.isConnectionExpensive !== undefined && (
        <Text>
          Expensive connection:{" "}
          {netInfo.details?.isConnectionExpensive.toString()}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
