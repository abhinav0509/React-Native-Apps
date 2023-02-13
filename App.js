import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
  ActivityIndicator,
} from "react-native";
import SearchInput from "./components/SearchInput";
import { useState, useEffect } from "react";

export default function App() {
  const [location, setLocation] = useState("Ranchi");
  const [conditiontext, setConditionText] = useState("");
  const [currentTemp, setCurrentTemp] = useState();
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getImageForWeather = (condition) => {
    const images = {
      Sunny: require("./assets/clear.png"),
      Fog: require("./assets/fog.jpeg"),
      Overcast: require("./assets/overcast.jpeg"),
      Mist: require("./assets/fog.jpeg"),
      Hail: require("./assets/hail.png"),
      "Heavy freezing drizzle": require("./assets/heavy-cloud.png"),
      "Partly cloudy": require("./assets/light-cloud.png"),
      "Heavy rain": require("./assets/heavy-rain.png"),
      "Light rain": require("./assets/light-rain.png"),
      Showers: require("./assets/showers.png"),
      "Light sleet": require("./assets/sleet.png"),
      "Light snow": require("./assets/snow.png"),
      "Thundery outbreaks possible": require("./assets/thunder.png"),
    };

    return images[condition];
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "8421aa08cbmsh0707b5a24382522p1de962jsn697fb95505d6",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(
          `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,
          options
        );
        const data = await response.json();

        setCurrentTemp(data.current.feelslike_c);

        setIcon(data.current.condition.icon);
        setConditionText(data.current.condition.text);
        setLoading(true);
        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };
    fetchData();
  }, [location]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.imageContainer}
        source={getImageForWeather(conditiontext)}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={!loading} color="black" size="large" />

          {error && (
            <View>
              <Text style={[styles.textStyle, styles.errorText]}>
                Error: Could not find this city,try another
              </Text>
            </View>
          )}
          {loading && !error && (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 82,
                marginTop: 60,
                padding: 16,
                color: "white",
                textAlign: "center",
              }}
            >
              {Math.floor(currentTemp)}º C
            </Text>
          )}
          <Text style={styles.smallText}>{conditiontext}</Text>

          <Image
            source={icon}
            style={{ width: 60, height: 30, color: "black" }}
          ></Image>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
              color: "white",
            }}
          >{`${location}`}</Text>

          <SearchInput
            placeholder={"Search any city"}
            setLocation={setLocation}
            setIcon={setIcon}
            setConditionText={setConditionText}
          />

          <StatusBar barStyle="light-content" />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
    color: "white",
  },
  errorText: {
    color: "red",
  },
});
