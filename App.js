// import { StatusBar } from 'expo-status-bar';
import React ,{useEffect,useState}from 'react';
import { render } from 'react-dom';
import { StyleSheet, View,Alert,Dimensions ,Button,Text,SafeAreaView,TouchableOpacity,TouchableHighlight,Image} from 'react-native';
// import MapView from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';
// import MapViewDirections from 'react-native-maps-directions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// origin = {latitude: 37.3318456, longitude: -122.0296002};
// destination = {latitude: 37.771707, longitude: -122.4053769};
import MapScreen from './map.js';
// import Home from './home.js';
import loginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Createride from './createride';
import Joinride from './joinride';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Ride from './ridepage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


class  HomeStack extends React.Component{
  constructor(prop)
  {
    super(prop);
    
    this.state = {
     login:null,
     loading:true,
     code_value:null,


    };
  }
  getData = async () => {
    try {
       value = await AsyncStorage.getItem('mykey')
      if(value !== null) {
         alert("if"+value)
        this.setState(
          {
            login:true,
            loading:false
          }
        )

      }
      else{
         alert("else"+value)
        this.setState(
          {
            login:false,
            loading:false
          }
        )
      }
      code_value = await AsyncStorage.getItem('code_value');
      if(code_value !== null) {
        //  alert("if"+code_value)
        this.setState(
          {
            code_value:true,
            loading:false
          }
        )

      }
      else{
        //  alert("else"+code_value)
        this.setState(
          {
            code_value:false,
            loading:false
          }
        )
      }

    } catch(e) {
      // error reading value
    }
  }
  componentDidMount = () =>
  {
  this.getData()
  
  }
 
  //remove ride code

    removeCode = async  () => {
  
    value = await AsyncStorage.removeItem('code_value')
    
 alert("You are Logout")
}
 endride =()=>
{
Alert.alert(
  'Conformation',
  'Are you sure you want to end ride?',
  [
    // {
    //  text: 'Ask me later', 
    //  onPress: () => console.log('Ask me later pressed')
    // },     
    {       
      text: 'Cancel',       
      onPress: () => console.log('Cancel Pressed'),       
      style: 'cancel',     
    },     
    {
      text: 'End Ride', 
      onPress: () => this.removeCode(),
    },   
  ],   
  { cancelable: false }, 
);


}
 
   
   render()
   {
    if(this.state.loading)
    {
      return <View><Text>Loading</Text></View>
    }
  return (
    
    <NavigationContainer>
    <Stack.Navigator
    
      // initialRouteName='loginScreen'
      // screenOptions={{
      //   headerStyle: { backgroundColor: '#CED2D7' },
      //  headerTintColor: '#fff',
      //   headerTitleStyle: { fontWeight: 'bold' },
      // }}
      // screenOptions={{
      //   headerShown: false
      // }}
      >
        
      {
         
       
        this.state.login===false?
        (<>
         <Stack.Screen
        name="loginScreen"
        component={loginScreen}
        options={{ title: 'Login In' }}
        options={{headerShown: false}}
      />
     
       <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: 'Home ' }}
        options={{headerShown: false}}
        
      />
      </>
        )
        : this.state.code_value==true ?
        (<>
      
         
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={{ title: 'Home ' }}
        options={{headerShown: true,
          headerRight: () => (
            <Button
              onPress={() =>this.endride()}
              title="Leave"
              color="red"
            />
          ),}}

        
      />
       
      </>
        )
        :
        (<>
          <Stack.Screen
         name="Home"
         component={HomeScreen}
         options={{ title: 'Login In' }}
         options={{headerShown: false}}
       />
      
        <Stack.Screen
         name="map"
         component={MapScreen}
         options={{ title: 'Home ' }}
         options={{headerShown: true,
          headerRight: () => (
            <Button
              onPress={() =>this.endride()}
              title="Leave"
              color="red"
            />
          ),}}
         
       />
       </>
         )
      

    }
    {/* <Stack.Screen
        name="map"
        component={MapScreen}
        options={{ title: 'Home ' }}
        options={{headerShown: false}}
        
      /> */}
     {/* <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Dashboard',
        headerTitleStyle: { 
          textAlign:"center", 
          flex:1 
      }, }}
        
      /> */}
      <Stack.Screen
        name="createride"
        component={Createride}
        options={{ title: 'Create Ride' ,headerTitleStyle: { 
          marginLeft:60,
          flex:1 ,fontSize:25
      } }}
        
      />
       <Stack.Screen
        name="joinride"
        component={Joinride}
        options={{ title: 'Join Ride'  ,headerTitleStyle: { 
          marginLeft:60,
          flex:1 ,fontSize:25
      }}}
        
      />
      <Stack.Screen
         name="home"
         component={HomeScreen}
         options={{ title: 'Login In' }}
         options={{headerShown: false}}
       />
       <Stack.Screen
         name="map1"
         component={MapScreen}
         options={{ title: 'Login In' }}
         options={{headerShown: false}}
       />
    </Stack.Navigator>
    </NavigationContainer>
  );
}}
// class  loginScreen extends React.Component {
//   render(){
//     return (
//     <SafeAreaView style={{ flex: 1 }}>
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
//             You are on Login Screen
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               this.props.navigation.navigate('HomeScreen')
//             }>
//             <Text>Go to Map Page</Text>
//           </TouchableOpacity>
         
//         </View>
       
//       </View>
//     </SafeAreaView>
//   );
// }}
class HomeScreen extends React.Component {
  // removeData = async () => {
  //   try {
  //      value = await AsyncStorage.removeItem('mykey')
  //  alert("DELETED")
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  constructor(prop)
  {
    super(prop);
    
    this.state = {
     login:''
     ,
     loading:true,

    };
  }
  getData = async () => {
    try {
       value = await AsyncStorage.getItem('mykey')
      //  alert(value)
     
        // alert("if"+value)
        this.setState(
          {
            login:value,
            loading:false
          }
        )
        // alert("if"+value)

        // alert("else"+value)
        // this.setState(
        //   {
        //     login:false,
        //     loading:false
        //   }
        // )
      
    } catch(e) {
      // error reading value
    }
  }
  componentDidMount = () =>
  {

  this.getData()
  this.interval = setInterval(() => this.getData(), 5000);
  
  }
  render(){
    
    return (
      <View>
      <Text style={{marginTop:40,marginLeft:80,fontSize:30}}>WELCOME TO LTT</Text>
      <Text style={{marginTop:40,marginLeft:'30%',fontSize:30}}>{this.state.login}</Text>
<View  style={styles1.container}>
  <TouchableHighlight onPress={()=>this.props.navigation.navigate('createride')} underlayColor="white">
<View style={styles1.rect6}>
  <View style={styles1.rect5}>
    <Image
      source={require("./assets/create.png")}
      resizeMode="cover"
      style={styles1.image}
    ></Image>
    <Text style={styles1.text7}>Create Ride</Text>
   
  </View>
</View>
</TouchableHighlight>
<TouchableHighlight onPress={()=> this.props.navigation.navigate('joinride')} underlayColor="white">
<View style={styles1.rect7} >
  <View style={styles1.rect52}>
    <Image
      source={require("./assets/join.png")}
      resizeMode="cover"
      style={styles1.image2}
    ></Image>
    <Text style={styles1.text72}>Join Ride</Text>
    
  </View>
</View>
</TouchableHighlight>

</View>

</View>
  );
}};
function DetailsScreen() {
  return (
    <View>
    
    <Text>abc1</Text>
    </View>
  );
}

// class  loginScreen extends React.Component {
//   render(){
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
//           You are on Login Screen
//         </Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             this.props.navigation.navigate('Home')
//           }>
//           <Text>Go to Dashboard Page</Text>
//         </TouchableOpacity>
       
//       </View>
     
//     </View>
//   </SafeAreaView>

//   );
// }}



export default HomeStack;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  map:
  {
    flex:1

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
const styles1 = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(0,0,0,1)",
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    height: 143,
    marginTop:'20%'
  },
  rect6: {
    width: 156,
    height: 128,
    marginLeft: 16,
    flexDirection: "row"
  },
  rect5: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 156
  },
  image: {
    width: 155,
    height: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  text7: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginTop: 5,
    marginLeft: 25
  },
  text4: {
    color: "rgba(255,255,255,1)",
    fontSize: 12,
    // fontFamily: "ibm-plex-sans-500",
    letterSpacing: 1,
    marginTop: -23,
    marginLeft: 58
  },
  rect7: {
    width: 156,
    height: 128,
    marginLeft: 16,
    flexDirection: "row"
  },
  rect52: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 156
  },
  image2: {
    width: 156,
    height: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  text72: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginTop: 5,
    marginLeft: 30
  },
  text42: {
    color: "rgba(255,255,255,1)",
    fontSize: 12,
    // fontFamily: "ibm-plex-sans-500",
    letterSpacing: 1,
    marginTop: -22,
    marginLeft: 40
  },
  rect8: {
    width: 156,
    height: 128,
    marginLeft: 16,
    flexDirection: "row"
  },
  rect53: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 156
  },
  image3: {
    width: 156,
    height: 64,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  text73: {
    color: "white",
    fontSize: 10,
    marginTop: 27,
    marginLeft: 40
  },
  text43: {
    color: "white",
    fontSize: 12,
    // fontFamily: "ibm-plex-sans-500",
    letterSpacing: 1,
    marginTop: -25,
    marginLeft: 40
  }
});
