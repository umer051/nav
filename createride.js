import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert 
} from 'react-native'
import { Text } from 'react-native-paper'
import Background from './Background'
import Logo from './Logo'
import Header from './Header'
import Button from './Button'
import TextInput from './TextInput'
import BackButton from './BackButton'
import { theme } from './theme'
import { emailValidator } from './emailValidator'
import { passwordValidator } from './passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
class CreteRide extends React.Component {
  
  constructor(prop)
  {
    super(prop);
    
    this.state = {
      destinaion:'',
      code:'',
      latitude:0,
      longitude:0,
      error: null,
      Address:'',
       reports: [],
       insert:[] ,
       name:'',
       id:'',
    };
  }
//  Button Click Function Start
   onLoginPressed = async  () => {
    var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
    try {
      await AsyncStorage.setItem('code_value', RandomNumber.toString())
     
    this.setState({
      code:await AsyncStorage.getItem('code_value'),
     name:await AsyncStorage.getItem('mykey'),
     id : await AsyncStorage.getItem('id')
    })
    } catch (e) {
      // saving error
    }
      this.setState(
        {
          loading:true
        }
      )

      this.props.navigation.navigate('map')
      this.setState(
        {
          loading:false
        }
      )
      console.log(this.state.code)

//send location
navigator.geolocation.getCurrentPosition(position=>{
 
  this.setState({
    latitude:position.coords.latitude,
    longitude:position.coords.longitude,
    error:null
  });
   //Alert.alert('abc','https://aumurussports.com/insertdata.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.code+'&user_name='+this.state.name);
   fetch('https://aumurussports.com/insertdata.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.code+'&user_name='+this.state.name+'&team_id='+this.state.id)
.then(res => res.json())
.then(data => {
this.setState({ insert: data })
// Alert.alert(data.id)
console.log('https://aumurussports.com/insertdata.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.code+'&user_name='+this.state.name+'&team_id='+this.state.id)

})
.catch(console.error)
 
  
}

,error=>this.setState({error:error.message}),{
  enableHighAccuracy:true,timeout:20000,maximumAge:2000
}

);

  }
  //  Button Click Function End

  
  //  this.props.navigation.navigate('HomeScreen');
  // fetchcity=(destination1)=>
  // { 
    
  //   this.setState({ destinaion:destination1})
  //   fetch("http://autocomplete.wunderground.com/aq?query="+destination1)
  //   .then(data=>data.json())
  //   .then(data2=>
  //     {
  //       console.log(data2)
       
  //     }
      
        
  
  //   )
  //   .catch(console.error)
  // }
render(){
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Create Ride</Header>
      <TextInput
        label="Select Destination"
        returnKeyType="next"
        value={this.state.destinaion}
        // onChangeText={(destinaion) => this.fetchcity(destinaion)}
        error={this.state.emailError}
        errorText={this.state.emailError}
        autoCapitalize="none"
       
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      
     
      <Button mode="contained" onPress={this.onLoginPressed} loading={this.state.loading}>
        Create Ride
      </Button>
      
    </Background>
  )
}
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default CreteRide
