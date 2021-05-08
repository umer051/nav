import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image, Text ,TouchableHighlight} from "react-native";

class Index extends React.Component {
  render()
  {
    return (
        <View>
            <Text style={{marginTop:40,marginLeft:80,fontSize:30}}>WELCOME TO LTT</Text>
            <Text style={{marginTop:40,marginLeft:80,fontSize:30}}>WELCOME TO LTT</Text>
    <View  style={styles.container}>
        <TouchableHighlight onPress={()=> alert("create")} underlayColor="white">
      <View style={styles.rect6}>
        <View style={styles.rect5}>
          <Image
            source={require("./assets/create.png")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
          <Text style={styles.text7}>Create Ride</Text>
         
        </View>
      </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=> alert("Join")} underlayColor="white">
      <View style={styles.rect7} >
        <View style={styles.rect52}>
          <Image
            source={require("./assets/join.png")}
            resizeMode="cover"
            style={styles.image2}
          ></Image>
          <Text style={styles.text72}>Join Ride</Text>
          
        </View>
      </View>
      </TouchableHighlight>
      
    </View>
    <TouchableHighlight
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('map')
            }>
            <Text>Go to Map Page</Text>
          </TouchableHighlight>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(0,0,0,1)",
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    height: 143,
    marginTop:'30%'
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

export default Index;
