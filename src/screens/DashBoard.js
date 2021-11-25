import React from "react";
import { SafeAreaView, Text, StyleSheet, View, Platform } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { Icon } from "react-native-elements";

const DashBoard = () => {
  const netInfo = useNetInfo();

  function networkIsConnected(props) {
    const isConnected =
      props.isConnected !== null && props.isConnected !== undefined
        ? props.isConnected
        : false;
    return isConnected;
  }

  function networkHasInternet(props) {
    const isInternetReachable =
      props.isInternetReachable !== null &&
      props.isInternetReachable !== undefined
        ? props.isInternetReachable
        : false;
    return isInternetReachable;
  }

  function StatusIcon(props) {
    if (props.boolean)
      return (
        <Icon
          style={{ alignSelf: "flex-start" }}
          name="check"
          type="evilicon"
          color="#00FF00"
        />
      );
    else
      return (
        <Icon
          style={{ alignSelf: "flex-start" }}
          name="close"
          type="evilicon"
          color="#ff0000"
        />
      );
  }

  function WifiIcon(props) {
    if (props.wifi) return <Icon name="wifi" type="material" color="#000000" />;
    else if (props.wifi === false)
      return <Icon name="wifi-off" type="material" color="#000000" />;
    return null;
  }

  function TextOrIcon(props) {
    if (props.value === null || props.value === undefined)
      return <Text>-</Text>;
    else if (typeof props.value === "boolean") {
      return <StatusIcon boolean={props.value} />;
    } else
      return (
        <Text style={{ alignSelf: "flex-start" }}>
          {props.value.toString()}
        </Text>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboard}>
        <WifiIcon wifi={netInfo.isWifiEnabled} />
        <View style={styles.infoContainer}>
          <View style={styles.infoItemWrapper}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ alignSelf: "flex-end" }}>Network type: </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextOrIcon value={netInfo.type}></TextOrIcon>
            </View>
          </View>
          <View style={styles.infoItemWrapper}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ alignSelf: "flex-end" }}>Connected: </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextOrIcon value={networkIsConnected(netInfo)}></TextOrIcon>
            </View>
          </View>

          <View style={styles.infoItemWrapper}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ alignSelf: "flex-end" }}>Has intenet: </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextOrIcon value={networkHasInternet(netInfo)}></TextOrIcon>
            </View>
          </View>

          {netInfo.type === "wifi" && (
            <>
              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>SSID: </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.ssid}></TextOrIcon>
                </View>
              </View>

              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>BSSID: </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.bssid}></TextOrIcon>
                </View>
              </View>

              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>IP-Adress: </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.ipAddress}></TextOrIcon>
                </View>
              </View>

              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>Subnet mask: </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.subnet}></TextOrIcon>
                </View>
              </View>

              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>
                    Signal strength:{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.strength}></TextOrIcon>
                </View>
              </View>

              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>
                    Network Frequency:{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.frequency}></TextOrIcon>
                </View>
              </View>
            </>
          )}
          {netInfo.type === "cellular" && (
            <>
              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>Carrier name: </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon value={netInfo.details?.carrier}></TextOrIcon>
                </View>
              </View>

              <View style={styles.infoItemWrapper}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ alignSelf: "flex-end" }}>
                    Cellular generation:{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextOrIcon
                    value={netInfo.details?.cellularGeneration}
                  ></TextOrIcon>
                </View>
              </View>
            </>
          )}

          <View style={styles.infoItemWrapper}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ alignSelf: "flex-end" }}>
                Expensive connection:{" "}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextOrIcon
                value={netInfo.details?.isConnectionExpensive}
              ></TextOrIcon>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  dashboard: {
    marginHorizontal: 30,
    padding: 20,
    alignContent: "center",
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
  infoContainer: {
    alignItems: "center",
  },
  infoItemWrapper: {
    flexDirection: "row",
    paddingVertical: 2,
    justifyContent: "center",
  },
  firstColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  secondColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
});
