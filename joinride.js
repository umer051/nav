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
      email:'',
      password:'',
      emailError: '',
      passwordError:'',
       reports: [],
       insert:[] ,
       mykey:'loading',
       loading:false,
       code:'',
       name:'',
       latitude:0,
       longitude:0,
       error: null,
       id:'',

    };
  }
 
 
   onLoginPressed = async () => {
 
    
    try {
      await AsyncStorage.setItem('code_value', this.state.email)
    } catch (e) {
      // saving error
    }
      this.setState(
        {
          loading:true
        }
      )
      this.setState({
       
       name:await AsyncStorage.getItem('mykey'),
       id : await AsyncStorage.getItem('id')
      })
      this.props.navigation.navigate('map1')
      this.setState(
        {
          loading:false
        }
      )
      //send location
      navigator.geolocation.getCurrentPosition(position=>{
 
        this.setState({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          error:null
        });
       //  Alert.alert(position.coords.latitude.toString(),position.coords.longitude.toString());
         fetch('https://aumurussports.com/insertdata.php?lat='+position.coords.latitude.toString()+'&lon='+position.coords.longitude.toString()+'&ride_code='+this.state.email+'&user_name='+this.state.name+'&team_id='+this.state.id)
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
  
  //  this.props.navigation.navigate('HomeScreen');
  
render(){
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Join Ride</Header>
      <TextInput
        label="Enter Joining Code"
        returnKeyType="next"
        value={this.state.email}
        onChangeText={(email) => this.setState({ email})}
        error={this.state.emailError}
        errorText={this.state.emailError}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      
     
      <Button mode="contained" onPress={this.onLoginPressed} loading={this.state.loading}>
        Join Ride
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
