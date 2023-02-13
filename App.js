import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView,
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  Platform, 
  ActivityIndicator} from 'react-native';
import SearchInput from './components/SearchInput';
import {useState,useEffect} from "react"


export default function App() {
  const[location,setLocation]=useState('Bokaro');
  const[conditiontext,setConditionText]=useState('');
  const[currentTemp,setCurrentTemp]=useState();
  const[icon,setIcon]=useState('');
  const[loading,setLoading]=useState(false);

  const getImageForWeather=(condition)=>{
    
  const images = {
  Sunny: require('./assets/clear.png'),
  Hail: require('./assets/hail.png'),
  'Heavy Cloud': require('./assets/heavy-cloud.png'),
  'Light Cloud': require('./assets/light-cloud.png'),
  'Heavy Rain': require('./assets/heavy-rain.png'),
  'Light Rain': require('./assets/light-rain.png'),
  Showers: require('./assets/showers.png'),
  Sleet: require('./assets/sleet.png'),
  Snow: require('./assets/snow.png'),
  Thunder: require('./assets/thunder.png'),
};
   console.log(images[condition]);
   return  images[condition];
   
}

 useEffect(()=>{
    const fetchData=async()=>{

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8421aa08cbmsh0707b5a24382522p1de962jsn697fb95505d6',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
       try{
          const response=await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, options)
          const data=await response.json();
          console.log(data.current);
          //console.log(data.current.condition.icon)
          setCurrentTemp(data.current.feelslike_c);
         
          setIcon(data.current.condition.icon);
          setConditionText(data.current.condition.text);
          setLoading(true);

       }catch(err){
        console.log(err);
       }
    }
    fetchData();
  },[location])
  return (
    
  <KeyboardAvoidingView 
      style={styles.container} 
      behavior='padding'>
    <StatusBar barStyle='light-content'/>  
    <ImageBackground 
      style={styles.imageContainer}
      source={getImageForWeather(conditiontext)}
      imageStyle={styles.image}
      >
    
   <View style={styles.detailsContainer}>
   <ActivityIndicator 
     animating={!loading} 
     color="black" 
     size="large"/>   

   {loading&&<Text 
               style={{fontWeight:"bold",
               fontSize:82,
               marginTop:60,
               padding:16,
               textAlign:"center"}}>{Math.floor(currentTemp)}º C</Text>}
            <Text style={styles.smallText}>{conditiontext}</Text> 
            <Image source={icon} style={{width:60,height:30,color:'black'}}></Image>

            <Text style={{fontWeight:"bold",fontSize:22,textAlign:"center"}}>{`in ${location}`}</Text>  

            
            <SearchInput placeholder={'Search any city'} setLocation={setLocation}/>  
                
            
            <StatusBar barStyle="light-content" />
    
          
          </View>
        </ImageBackground>
      </KeyboardAvoidingView> 
         

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
   },
   imageContainer:{
    flex:1,
    
  },
  image:{
    flex:1,
    width:null,
    height:null,
    resizeMode:'cover',
  },
  detailsContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.2)',
    paddingHorizontal:20,
  },
  textStyle:{
    textAlign:'center',
    fontFamily:Platform.OS==='ios'?'AvenirNext-Regular':'Roboto', 
    color:'white',
  },
  largeText:{
    fontSize:44
  },
  smallText:{
    fontSize:18,
  },
  
  

});
