import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

class HomeScreen extends React.Component {
  render(){
    
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
              
              itemId: {JSON.stringify(this.props.route.params.itemId)}
                          You are on Dashboard Screen+{JSON.stringify(this.props.route.params.itemId)}
            
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('map')
            }>
            <Text>Go to Map Page</Text>
          </TouchableOpacity>
         
        </View>
       
      </View>
    </SafeAreaView>
  );
}};
class loginScreen extends React.Component {
    render(){
      return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16,
              }}>
                 itemId: {JSON.stringify(this.props.route.params.itemId)}
              You are on Dashboard Screen
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('map')
              }>
              <Text>Go to Map Page</Text>
            </TouchableOpacity>
           
          </View>
         
        </View>
      </SafeAreaView>
    );
  }};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default HomeScreen;
