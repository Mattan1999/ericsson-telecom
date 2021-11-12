import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableNativeFeedback,
  Text,
  SafeAreaView
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const MapScreen = () => {
  const [mapType, setMapType] = useState("standard");
  const mapTypes = ["Standard", "Satellite", "Terrain", "Hybrid"];
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  // ------------------
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setCameraPostion();
    }
  }, [location]);

  function setCameraPostion() {
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }
  // -------------------------

  return (
    <SafeAreaView>
    <>
      <MapView
        style={styles.mapStyle}
        mapType={mapType}
        showsUserLocation={true}
        region={userLocation === {} ? null : userLocation}
      />

      <View style={styles.mapVariants}>
        {mapTypes.map((mapType) => (
          <TouchableNativeFeedback
            key={mapType}
            onPress={() => setMapType(mapType.toLowerCase())}
          >
            <View style={styles.standardMapViewButton}>
              <Text>{mapType}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
    </>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.65,
  },
  mapVariants: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.085,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  standardMapViewButton: {
    marginTop: 12,
    width: 75,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 5,
  },
});
