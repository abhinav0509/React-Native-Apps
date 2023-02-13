import { TextInput,StyleSheet,View } from "react-native"

const SearchInput = ({placeholder,setLocation}) => {
  return (
    <View style={styles.container}>
          <TextInput
                    
                    clearButtonMode="always" 
                    onChangeText={newLocation=>setLocation(newLocation)}
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor="white">
          </TextInput>
    </View>
  )
}
const styles=StyleSheet.create({
    textInput:{
        backgroundColor:'#666',
        color:'white',
        height:40,
        width:300,
        alignSelf:'center',
        paddingHorizontal:10,
        borderRadius:6,
     },
     container:{
      flex:1,
      backgroundColor:'#34495E'
     }
     
})

export default SearchInput