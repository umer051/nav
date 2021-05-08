import * as React from 'react';
import { Alert } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { theme } from './theme'
import loginScreen from './LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const MyComponent = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const  removeData = async  () => {
  
      value = await AsyncStorage.removeItem('mykey')
  alert("You are Logout")
 // navigation.navigate('loginScreen')
  }
const logout =()=>
{
  Alert.alert(
    'Conformation',
    'Are you sure you want to logout?',
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
        text: 'Logout', 
        onPress: () => removeData(),
      },   
    ],   
    { cancelable: false }, 
  );
}
  return (
    <Provider styles={{color:theme.colors.primary}}>
      <Portal styles={{color:theme.colors.primary}}>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
          color={theme.colors.primary}
          actions={[
            // { icon: 'plus', onPress: () => console.log('Pressed add') },
           
            {
              icon: 'share',
              label: 'Share Location',
              onPress: () => Alert.alert('Pressed Share Location Button'),
              small: false,
              color:theme.colors.primary
            },
            {
              icon: 'help',
              label: 'Help Me',
              onPress: () => Alert.alert('Pressed Help Me Button'),
              small: false,
              color:theme.colors.primary
            },
            {
              icon: 'logout',
              label: 'Logout',
              onPress: () => logout(),
              small: false,
              color:theme.colors.primary
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default MyComponent;