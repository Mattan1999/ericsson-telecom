import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const DashBoard = () => {
  const [connectionType, setConnectionType] = useState(null);
  const [details, setDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [heatMapPoints, setheatMapPoints] = useState([]);

  const netInfo = useNetInfo();

  return (
    <SafeAreaView>
      <Text>Connection type: {netInfo.type}</Text>
      <Text>SSID: {netInfo.details.ssid}</Text>
      <Text>BSSID: {netInfo.details.bssid}</Text>
      <Text>IP-Adress: {netInfo.details.ipAddress}</Text>
      <Text>Subnet Mask: {netInfo.details.subnet}</Text>
      <Text>Signal strength: {netInfo.details.strength}</Text>
      <Text>Carrier name: {netInfo.details.carrier}</Text>
      <Text>Cellulur generation: {netInfo.details.cellularGeneration}</Text>
      <Text>Network Frequency: {netInfo.details.frequency}</Text>
      <Text>
        Expensive connection: {netInfo.details.isConnectionExpensive.toString()}
      </Text>
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
