import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert ,ScrollView} from 'react-native'
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
import { nameValidator } from './nameValidator'
import { cnicValidator } from './cnicvalidation'
class RegisterScreen extends React.Component  {
  constructor(prop)
  {
    super(prop);
    
    this.state = {
      email:'',
      password:'',
      emailError: '',
      passwordError:'',
      name:'',
      nameError:'',
      cnic:'',
      cnicError:'',insert:[],
      loading:false

    };
  }

   onSignUpPressed = () => {
    this.setState(
      {
        loading:true
      }
    )
    var nameError = nameValidator(this.state.name)
    var emailError = emailValidator(this.state.email)
    var passwordError = passwordValidator(this.state.password)
    var cnicError = cnicValidator(this.state.cnic)
    if (emailError || passwordError || nameError|| cnicError ) {
      this.setState({  nameError })
      this.setState({  emailError })
      this.setState({ passwordError })
      this.setState({  cnicError })
      this.setState(
        {
          loading:false
        }
      )
      return
    }
    else
    {
      
       this.setState(
         {
           loading:true
         }
       )
      //  Alert.alert("ok",'https://aumurussports.com/register.php?email='+this.state.email.toString())
         
      fetch('https://aumurussports.com/register.php?email='+this.state.email.toString()+'&pass='+this.state.password.toString()+'&name='+this.state.name.toString())
      .then((response) => response.json())
      .then(data => {
        this.setState({ insert: data })
        // alert(this.state.insert.id)
  if(  this.state.insert.id==null)
{
  alert("This Email already register ")
    // alert(this.state.insert[0].name)
      // this.props.navigation.navigate('HomeScreen', {
      //   itemId: this.state.insert[0].name,
      // });
      // if(this.state.insert[0].name==1)
      // {
      //   alert("alerday register email")
      // }
      // else{
      //   alert(" registeration done")
      // }
      this.setState(
        {
          loading:false
        }
      )
  }
  else{
    alert("Your Account has been  Register Successfully")
    this.setState(
      {
        loading:false
      }
    )
  }
     
      })
      .catch((error) => console.error(error))
     
  }
  
  }
render(){
  return (
   
    <Background>
       
      <BackButton goBack={this.props.navigation.goBack} />
      
      <Logo />
      <Header>Create Account</Header>
      
      <TextInput
        label="Name"
        returnKeyType="next"
        value={this.state.name}
        onChangeText={(name) => this.setState({ name})}
        error={this.state.nameError}
        errorText={this.state.nameError}
      />
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
      <TextInput
        label="CNIC"
        returnKeyType="done"
        value={this.state.cnic}
        onChangeText={(cnic) => this.setState({ cnic})}
        error={this.state.cnicError}
        errorText={this.state.cnicError}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={this.onSignUpPressed}
        style={{ marginTop: 24 }}
        loading={this.state.loading}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('loginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      
    </Background>
   
  )
}}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default RegisterScreen
