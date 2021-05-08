import React from 'react';
import { render } from 'react-dom';
  
  import { StyleSheet, View,Alert,Dimensions ,Button,Text,SafeAreaView,Image ,TouchableOpacity,TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';
import { getDistance } from 'geolib';
import { theme } from './theme'
// import Geocoder from 'react-native-geocoding';
// import MapViewDirections from 'react-native-maps-directions';
// import { NavigationContainers } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyComponent from './help';
import singleuserlocation from './place.js';
import Chat from './chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getDistance } from 'geolib';
class HomeScreen extends React.Component
 {
// code='abc';
 
//  GOOGLE_MAPS_APIKEY = 'AIzaSyAo0-IwAm0tOz9I5c2Z6BQPoC78Pf1tBXs';
  constructor(prop)
  {
    super(prop);
    
    this.state = {
      latitude:0,
      longitude:0,
      error: null,
      Address:'',
       reports: [],
       insert:[] ,code:'1234',
       code:'',
       name:'',
       id:'',

    };
  }
//   responseList() {
//     fetch('YOUR API', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             data: itemsUSERNAME
//         })

//     }).then((response) => response.json())
//         .then((responseJson) => {
//             this.setState({ package: responseJson.results });
//         }).catch((error) => {
//             console.error(error);
//         });
// }
// userdata = () => {
 
  
//     }
 
    mapMarkers =  () => {
      return this.state.reports.map((report) =>
        
      < MapView.Marker
      
        key={report.id}
        coordinate={{ latitude: Number(report.lat), longitude: Number(report.lon) }}
        title={report.name}
       
        // description={report.comments}
      >
        {/* <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}} style={{width: 42, height: 42}} /> */}
      </MapView.Marker >)
      
    }
    //insert and get location from database
   getlocation = async () => {
    navigator.geolocation.getCurrentPosition(position=>{
 
      this.setState({
      
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
        error:null,
       
      });
   
     //  Alert.alert(position.coords.latitude.toString(),position.coords.longitude.toString());
       fetch('https://aumurussports.com/update_user_location.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.code+'&user_name='+this.state.name+'&team_id='+this.state.id)
.then(res => res.json())
.then(data => {
  this.setState({ insert: data })
  // Alert.alert(data.id)
  console.log('https://aumurussports.com/update_user_location.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.code+'&user_name='+this.state.name+'&team_id='+this.state.id)
  
})
.catch(console.error)
     
      
    }
    
    ,error=>this.setState({error:error.message}),{
      enableHighAccuracy:true,timeout:20000,maximumAge:2000
    }
    
    );
   }


  // get markers from database
  getdata = async  () =>
  {
    
    fetch('https://aumurussports.com/markerdata.php?code_value='+this.state.code)
.then(res => res.json())
.then(data => {
  this.setState({ reports: data })
   //Alert.alert("a")
 
  //   code:   AsyncStorage.getItem('code_value'),
  //   name:  AsyncStorage.getItem('mykey'),
  //   id :  AsyncStorage.getItem('id'),
  // });
})
.catch(console.error)

console.log('https://aumurussports.com/markerdata.php?code_value='+this.state.code)
// this.setState({
  }
savecode = async ()=>
{
  this.setState({
    code : await AsyncStorage.getItem('code_value'),
   name: await AsyncStorage.getItem('mykey'),
     id : await  AsyncStorage.getItem('id'),
  // });
  });
  // Alert.alert(this.state.code);
}
  //run function
  componentDidMount = () =>
  {
    // Alert.alert(this.state.code);
   

    
    this.interval = setInterval(() => this.getdata(), 5000);
     this.interval = setInterval(() => this.savecode(), 5000);
     this.interval = setInterval(() => this.getlocation(), 5000);
// this.getlocation()
// setInterval(this.componentDidMount.bind(this), 10000);
// Alert.alert(latitude,longitude);
// Geocoder.init('AIzaSyAo0-IwAm0tOz9I5c2Z6BQPoC78Pf1tBXs');
// Geocoder.from(41.89, 12.49)
// .then(json => {
//             // console.log(json);
//            var addressComponent = json.results[0].address_components;
          
//                        Alert.alert(addressComponent);

//                     })
 
//                     .catch(error => console.warn(error));


  }
 
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

 
  render(){
  return (
  
    <View style={styles.container}>
    
      <MapView style={styles.map}
      showsUserLocation={true}
      zoomEnabled={true}
   Region={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
   >
       {/* <MapView.Marker
    coordinate={this.state}
    title={"Your Location"}
    draggable /> */}
    {this.mapMarkers()}
 {/* <Polyline coordinates={this.state} strokeWidth={5} /> */}
 {/* <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={GOOGLE_MAPS_APIKEY}
  /> */}

    </MapView>
   
    
    <View
    
        // style={{
        //     position: 'absolute',//use absolute position to show button on top of the map
        //     top: '90%',
        //     justifyContent: 'center',
        //     alignItems: 'center', //for center align
        //    alignSelf: 'center' //for align to right
        // }}
    >
         {/* <TouchableHighlight
            style={styles.buttonStyle}
            onPress={calculateDistance}>
            <Text>Get Distance</Text>
          </TouchableHighlight> */}
      
    
     {/* <Button title ="update code" onPress={this.savecode}></Button> */}
    
   
    </View>
    <MyComponent />
  </View>
    
  );
  
}
}
// class DetailsScreen extends React.Component{
//     render()
//     {
//       return(
      
//         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//           <Text>detail Screen</Text>
//           {/* <Button title="abc" onPress={() => this.props.navigation.navigate('Home')}></Button> */}
//         </View>
//       );
//     }
//   }
  class Notifications extends React.Component{
    render()
    {
      return(
      
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>Notifications</Text>
          {/* <Button title="abc" onPress={() => this.props.navigation.navigate('Home')}></Button> */}
        </View>
      );
    }
  }
const Tab = createBottomTabNavigator();

// const Stack = createStackNavigator();
const DetailsScreen = () => {
  return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          activeTintColor:  theme.colors.primary,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
             
            ),
          }}
        />
        <Tab.Screen
          name="Places"
          component={places}
          options={{
            tabBarLabel: 'Location',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="google-maps"
                color={color}
                size={size}
              />
            ),
          }}
        />
          <Tab.Screen
          name="singleuserlocation"
          component={singleuserlocation}
          options={{
            tabBarLabel: 'Place',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map"
                color={color}
                size={size}
              />
            ),
          }}
        />
         <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="wechat"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};
// function singleuserlocation() {
//   return (
// <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontSize: 25,
//               textAlign: 'center',
//               marginBottom: 16,
//             }}>
//             You are on Places Screen
//           </Text>
//           {/* <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               this.props.navigation.navigate('map')
//             }>
//             <Text>Go to Map Page</Text>
//           </TouchableOpacity> */}
         
//         </View>
//         <MyComponent />
//       </View>
//     </SafeAreaView>
//   );
// }

class places extends React.Component {
  // code='abc';
 
//  GOOGLE_MAPS_APIKEY = 'AIzaSyAo0-IwAm0tOz9I5c2Z6BQPoC78Pf1tBXs';
constructor(prop)
{
  super(prop);
  
  this.state = {
    latitude:0,
    longitude:0,
    error: null,
    Address:'',
     reports: [],
     insert:[] ,code:'1234',
     code:'',
     name:'',
     id:'',

  };
}
//   responseList() {
//     fetch('YOUR API', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             data: itemsUSERNAME
//         })

//     }).then((response) => response.json())
//         .then((responseJson) => {
//             this.setState({ package: responseJson.results });
//         }).catch((error) => {
//             console.error(error);
//         });
// }
// userdata = () => {


//     }
//  distance=(lat1, lon1, lat2, lon2, unit)=> {
//   var radlat1 = Math.PI * lat1/180
//   var radlat2 = Math.PI * lat2/180
//   var theta = lon1-lon2
//   var radtheta = Math.PI * theta/180
//   var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//   dist = Math.acos(dist)
//   dist = dist * 180/Math.PI
//   dist = dist * 60 * 1.1515
//   if (unit=="K") { dist = dist * 1.609344 }
//   if (unit=="M") { dist = dist * 0.8684 }
//   return dist
// }
calculateDistance = (lat1,lon1,lat2,lon2) => {
   
  navigator.geolocation.getCurrentPosition(position=>{



      var dis = getDistance(
          { latitude: position.coords.latitude.toString(), longitude: position.coords.longitude.toString() },
          { latitude: lat2, longitude: lon2 }
        );
      //   alert(lat2)
      //   alert(lon2)
        alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
      //   alert(position.coords.latitude.toString(),position.coords.longitude.toString())
//         this.setState({
//           latitude:position.coords.latitude,
//           longitude:position.coords.longitude,
//           error:null
//         });
//          Alert.alert(position.coords.latitude.toString(),position.coords.longitude.toString());
//          fetch('https://aumurussports.com/insertdata.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString())
//   .then(res => res.json())
//   .then(data => {
//     this.setState({ insert: data })
//     // Alert.alert(data.id)
  
//   })
//   .catch(console.error)
     
      
    }
    
    ,error=>this.setState({error:error.message}),{
      enableHighAccuracy:true,timeout:20000,maximumAge:2000
    }
    
    );
  

     
  

};
  mapMarkers = () => {
  
    return this.state.reports.map((report) => 
    
    //  radlat1 = Math.PI * this.state.latitude/180,
    //  radlat2 = Math.PI * reports.lat/180,
    // theta = this.state.longitude-reports.lon,
    //  radtheta = Math.PI * theta/180,
    //  dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta),
    // dist = Math.acos(dist),
    // dist = dist * 180/Math.PI,
    // dist = dist * 60 * 1.1515,
    // dist = dist * 1.609344,
    // Alert.alert(dist),
    // if (unit=="K") { dist = dist * 1.609344 }
    // if (unit=="M") { dist = dist * 0.8684 }
    < MapView.Marker
    
      key={report.id}
      coordinate={{ latitude: Number(report.lat), longitude: Number(report.lon) }}
      title={report.name}
      onPress={() => this.calculateDistance(this.state.latitude,this.state.longitude,report.lat,report.lon)}
      //  description={dis}
    >
    </MapView.Marker >)
    
  }
  //insert and get location from database
 getlocation = () => {
  navigator.geolocation.getCurrentPosition(position=>{

    this.setState({
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
      error:null
    });
    // Alert.alert(position.coords.latitude.toString(),position.coords.longitude.toString());
     fetch('https://aumurussports.com/update_user_location.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.code+'&user_name='+this.state.name+'&team_id='+this.state.id)
.then(res => res.json())
.then(data => {
this.setState({ insert: data })
// Alert.alert(data.id)

})
.catch(console.error)
   
    
  }
  
  ,error=>this.setState({error:error.message}),{
    enableHighAccuracy:true,timeout:20000,maximumAge:2000
  }
  
  );
 }


// get markers from database
getdata =() =>
{
  fetch('https://aumurussports.com/markerdata.php?code_value='+this.state.code)
.then(res => res.json())
.then(data => {
this.setState({ reports: data })
// Alert.alert("a")

})
.catch(console.error)
}
savecode = async ()=>
{
  this.setState({
    code : await AsyncStorage.getItem('code_value'),
   name: await AsyncStorage.getItem('mykey'),
     id : await  AsyncStorage.getItem('id'),
  // });
  });
  // Alert.alert(this.state.code);
}
//run function
componentDidMount = () =>
{
  // Alert.alert(this.state.code);
 

  
  this.interval = setInterval(() => this.getdata(), 5000);
  this.interval = setInterval(() => this.savecode(), 5000);
  this.interval = setInterval(() => this.getlocation(), 5000);
 
// this.getlocation()
// setInterval(this.componentDidMount.bind(this), 10000);
// Alert.alert(latitude,longitude);
// Geocoder.init('AIzaSyAo0-IwAm0tOz9I5c2Z6BQPoC78Pf1tBXs');
// Geocoder.from(41.89, 12.49)
// .then(json => {
//             // console.log(json);
//            var addressComponent = json.results[0].address_components;
        
//                        Alert.alert(addressComponent);

//                     })

//                     .catch(error => console.warn(error));


}


componentWillUnmount() {
  clearInterval(this.interval);
}


render(){
return (

  <View style={styles.container}>
  
    <MapView style={styles.map}
    showsUserLocation={true}
    zoomEnabled={true}
 Region={{
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
 >
     {/* <MapView.Marker
  coordinate={this.state}
  title={"Your Location"}
  draggable /> */}
  {this.mapMarkers()}
{/* <Polyline coordinates={this.state} strokeWidth={5} /> */}
{/* <MapViewDirections
  origin={origin}
  destination={destination}
  apikey={GOOGLE_MAPS_APIKEY}
/> */}

  </MapView>
 
  
  <View
      // style={{
      //     position: 'absolute',//use absolute position to show button on top of the map
      //     top: '90%',
      //     justifyContent: 'center',
      //     alignItems: 'center', //for center align
      //    alignSelf: 'center' //for align to right
      // }}
  >
      {/* <Button title ="INSERT Loction" style={{width:50}} onPress={this.getlocation}></Button>
      <Button title ="update code" onPress={this.savecode}></Button> */}
  </View>
  <MyComponent />
</View>
  
);

}
}
// function chat() {
//   return (
 
//     <SafeAreaView style={{ flex: 1 }}>
//     <View style={{ flex: 1, padding: 16 }}>
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text
//           style={{
//             fontSize: 25,
//             textAlign: 'center',
//             marginBottom: 16,
//           }}>
//           You are on Chat Screen
//         </Text>
//         {/* <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             this.props.navigation.navigate('map')
//           }>
//           <Text>Go to Map Page</Text>
//         </TouchableOpacity> */}
       
//       </View>
      
//     </View>
//   </SafeAreaView>
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex:300
  },
  map:
  {
    flex:300

  }
});
export default DetailsScreen;