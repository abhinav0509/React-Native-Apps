import { TextInput, StyleSheet, View } from "react-native";

const SearchInput = ({
  placeholder,
  setLocation,
  setIcon,
  setConditionText,
}) => {
  const handleChange = (newLocation) => {
    setLocation(newLocation);
    setIcon("");
    setConditionText("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        clearButtonMode="always"
        onChangeText={(newLocation) => handleChange(newLocation)}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="white"
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: "white",
    width: 300,
  },
  container: {
    height: 40,
    marginTop: 10,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchInput;
