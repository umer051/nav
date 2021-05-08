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
class LoginScreen extends React.Component {
  
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
       id:'1',
       loading:false

    };
  }
  storeData = async () => {
    try {
      await AsyncStorage.setItem('mykey', this.state.mykey)
      await AsyncStorage.setItem('id', this.state.id)
    this.setState({
      mykey:await AsyncStorage.getItem('mykey'),
      id:await AsyncStorage.getItem('id')
    })
    } catch (e) {
      // saving error
    }
    console.log(this.state.mykey)
    console.log(this.state.id)
  }
 
   onLoginPressed = () => {
     
    var emailError = emailValidator(this.state.email)
    var passwordError = passwordValidator(this.state.password)
    if (emailError || passwordError) {
      this.setState({ emailError })
      this.setState({ passwordError })
      return
    }
    else
    {
      this.setState(
        {
          loading:true
        }
      )
       
      // Alert.alert("ok",'https://aumurussports.com/userdata.php?email='+this.state.email.toString())
         
      fetch('https://aumurussports.com/userdata.php?email='+this.state.email.toString())
      .then((response) => response.json())
      .then(data => {
        this.setState({ insert: data })
          // this.state.insert[0].name
  if(  this.state.insert.length>0)
{
  this.setState(
    {
      mykey: this.state.insert[0].name,
      id: this.state.insert[0].auto_id
    }
  )
 this.storeData()
 this.setState(
  {
    loading:false
  }
)
    // alert(this.state.insert[0].name)
      this.props.navigation.navigate('home');
  }
  else{
    
    Alert.alert("Error","You are not register yet..")
  }
      this.setState(
        {
          loading:false
        }
      )
      })
      .catch((error) => console.error(error))
     
  }
  
  //  this.props.navigation.navigate('HomeScreen');
  }
render(){
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Singn In</Header>
      <TextInput
        label="Email"
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
      <TextInput
        label="Password"
        returnKeyType="done"
        value={this.state.password}
        onChangeText={(password) => this.setState({ password})}
        error={this.state.passwordError}
        errorText={this.state.passwordError}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={this.onLoginPressed} loading={this.state.loading}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
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

export default LoginScreen
