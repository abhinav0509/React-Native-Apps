const images = {
  Sunny: require("../assets/clear.png"),
  Clear: require("../assets/clear.png"),
  Fog: require("../assets/fog.jpeg"),
  Overcast: require("../assets/overcast.jpeg"),
  Mist: require("../assets/fog.jpeg"),
  Hail: require("../assets/hail.png"),
  "Heavy freezing drizzle": require("../assets/heavy-cloud.png"),
  "Partly cloudy": require("../assets/light-cloud.png"),
  "Heavy rain": require("../assets/heavy-rain.png"),
  "Light rain": require("../assets/light-rain.png"),
  Showers: require("../assets/showers.png"),
  "Light sleet": require("../assets/sleet.png"),
  "Light snow": require("../assets/snow.png"),
  "Thundery outbreaks possible": require("../assets/thunder.png"),
};
export default (condition) => images[condition];
