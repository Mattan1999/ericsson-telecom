import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MapView from "react-native-maps";

import * as Location from "expo-location";
import HeatMapIntervalSettings from "../../components/HeatMapIntervalSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = () => {
  const [mapType, setMapType] = useState("standard");
  const mapTypes = ["Standard", "Satellite", "Terrain", "Hybrid"];
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [heatMapPoints, setHeatMapPoints] = useState([]);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [watchPosition, setWatchPosition] = useState(false);

  useEffect(() => {
    const _getLocationPermissonAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Gets location one time
      await loadHeatMap();
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };
    _getLocationPermissonAsync();

    return () => {
      // Clean up function - removes location update subscription if it is active
      if (locationSubscription) {
        console.log("Removing subscription");
        locationSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Setting camera position and heat map points in map view if location is available
    if (location !== null) {
      setCameraPostion();
    }
  }, [location]);

  // Starts a subscription to location updates
  // - timeInterval is how often it should update the location in milliseconds
  async function _getLocationAsync() {
    if (watchPosition) {
      console.log("Subscribing");
      let subscribe;

      let locationArguments = {
        timeInterval: 1000,
        accuracy: Location.Accuracy.BestForNavigation,
      };

      subscribe = await Location.watchPositionAsync(
        locationArguments,
        (res) => {
          setLocation(res.coords);
          addToHeatMap(res.coords);
          saveHeatmap();
          console.log(res.coords);
        }
      );

      setLocationSubscription(subscribe);
    }
  }

  function getRandomStrength() {
    return Math.floor(Math.random() * 100);
  }

  function addToHeatMap(coordinates) {
    const obj = [
      {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        weight: 1,
        signalStrength: getRandomStrength(),
      },
    ];
    const array = [...heatMapPoints, obj];
    console.log(heatMapPoints.length);
    setHeatMapPoints((oldArray) => [...oldArray, obj]);
  }

  async function saveHeatmap() {
    try {
      const string = JSON.stringify(heatMapPoints);
      await AsyncStorage.setItem("@heatMapPoints", string);
    } catch (error) {
      console.log(error);
    }
  }

  const loadHeatmap = async () => {
    try {
      const string = await AsyncStorage.getItem("@heatMapPoints");
      return string != null ? JSON.parse(string) : null;
    } catch (e) {
      // error reading value
    }
  };

  // Runs the 'updateLocationSubscription' function everytime the 'watchPosition' variable updates
  useEffect(() => {
    updateLocationSubscription();
  }, [watchPosition]);

  // Calls the '_getLocationAsync' function if 'watchLocation' is true
  // Removes the location subscription if 'watchLocation' is false
  function updateLocationSubscription() {
    if (watchPosition) {
      if (locationSubscription === null) {
        _getLocationAsync();
      }
    } else {
      if (locationSubscription !== null) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
    }
  }

  function setCameraPostion() {
    setUserLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    });
  }

  async function loadHeatMap() {
    const loadedHeatmap = await loadHeatmap();
    console.log("heaetmap", loadedHeatmap.length);
    if (loadedHeatmap !== null) setHeatMapPoints(loadedHeatmap);
    else
      setHeatMapPoints([
        [
          {
            latitude: location.latitude,
            longitude: location.longitude,
            weight: 1,
            signalStrength: 18,
          },
        ],
        [
          {
            latitude: 57.697631,
            longitude: 11.984283,
            weight: 1,
            signalStrength: 90,
          },
        ],
        [
          {
            latitude: 57.694977,
            longitude: 11.991765,
            weight: 1,
            signalStrength: 80,
          },
        ],
        [
          {
            latitude: 57.679818,
            longitude: 11.998311,
            weight: 1,
            signalStrength: 70,
          },
        ],
        [
          {
            latitude: 57.682326,
            longitude: 12.011665,
            weight: 1,
            signalStrength: 60,
          },
        ],
        [
          {
            latitude: 57.692592,
            longitude: 11.983345,
            weight: 1,
            signalStrength: 50,
          },
        ],
        [
          {
            latitude: 57.697658,
            longitude: 11.990237,
            weight: 1,
            signalStrength: 40,
          },
        ],
        [
          {
            latitude: 57.675599,
            longitude: 11.998295,
            weight: 1,
            signalStrength: 30,
          },
        ],
        [
          {
            latitude: 57.67696,
            longitude: 12.014824,
            weight: 1,
            signalStrength: 20,
          },
        ],
        [
          {
            latitude: 57.705729,
            longitude: 11.987392,
            weight: 1,
            signalStrength: 0,
          },
        ],
      ]);
  }

  // Changes heatmap point color depending on the network signal strength (only works on WiFi)
  function heatMapColor(number) {
    var color = "";
    switch (Math.ceil(number / 20)) {
      case 5:
        color = "darkgreen";
        break;
      case 4:
        color = "lightgreen";
        break;
      case 3:
        color = "yellow";
        break;
      case 2:
        color = "orange";
        break;
      case 1:
        color = "red";
        break;
      default:
        color = "grey";
        break;
    }

    let obj = { colors: [color], startPoints: [1], colorMapSize: 256 };
    return obj;
  }

  return (
    <>
      {errorMsg === null ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.map}>
            {userLocation !== null && (
              <MapView
                style={styles.mapStyle}
                mapType={mapType}
                showsUserLocation={true}
                region={userLocation}
              >
                {heatMapPoints.map((point, index) => (
                  <MapView.Heatmap
                    key={index}
                    points={point}
                    opacity={0.8}
                    radius={30}
                    gradient={heatMapColor(point[0].signalStrength)}
                  ></MapView.Heatmap>
                ))}
              </MapView>
            )}
            <TouchableNativeFeedback
              onPress={() => setWatchPosition(!watchPosition)}
            >
              <View style={styles.watchLocationButton}>
                <Text>
                  {watchPosition ? "Watching position" : "Watch position"}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.bottom}>
            {userLocation !== null && (
              <>
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
                <HeatMapIntervalSettings />
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 18 }}>{errorMsg}</Text>
          <TouchableNativeFeedback
            onPress={() => {
              /* Request permissions*/
            }}
          >
            <View
              style={{
                marginTop: 16,
                padding: 8,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <Text>Grant location permissions</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  watchLocationButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#33333350",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  mapVariants: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  standardMapViewButton: {
    marginTop: 12,
    marginBottom: 12,
    width: 75,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 5,
  },
});
