import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView from 'react-native-maps';
import { Avatar } from 'react-native-paper';
export default function App() {
  const  renderHeader = () => (
        <View
          style={{
            width: '20%',
            backgroundColor: 'black',
            height: 7,
            
            borderRadius:20,
            alignItems :'center',
            
            flexDirection: 'row',
    justifyContent: 'space-between',
          }}
        >
         
        </View>
      )
  const renderContent = () => (
      
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 400,
        alignItems :'center',

      }}
    >{renderHeader()}
        <Text style={{textAlign:'center',marginBottom: 10,fontWeight: 'bold',fontSize: 15}}>{renderHeader()}</Text>
        <Text style={{textAlign:'center',marginBottom: 10,fontWeight: 'bold',fontSize: 15}}>Explore Here</Text>
        <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap" ,justifyContent:'space-between',marginBottom: 10}}>
        
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}}/>
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}}/>
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      <Avatar.Image size={70} source={require('./assets/avatar.png')} Text="Restorent" style={{marginBottom: 10}} />
      </View>
      
    </View>
    
  );

  const sheetRef = React.useRef(null);
  
    
     var state = {
      latitude:0,
      longitude:0,
      error: null,
      Address:'',
       reports: [],
       insert:[] ,code:'1234'

    };
//    const mapMarkers = () => {
//         return state.reports.map((report) =>
          
//         < MapView.Marker
        
//           key={report.id}
//           coordinate={{ latitude: Number(report.lat), longitude: Number(report.lon) }}
//           title={report.name}
         
//           // description={report.comments}
//         >
//           {/* <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}} style={{width: 42, height: 42}} /> */}
//         </MapView.Marker >)
        
//       }
//     const  getdata =() =>
//       {
//         fetch('https://aumurussports.com/markerdata.php')
//     .then(res => res.json())
//     .then(data => {
//       setState({ reports: data })
//       // Alert.alert("a")
      
//     })
//     .catch(console.error)
    
//       }
//    const savecode =()=>
//     {
//       setState(
//         {
//           code:'abc'
//         }
//       )
//       // Alert.alert(this.state.code);
//     }
//       //run function
//      const componentDidMount = () =>
//       {
//         // Alert.alert(this.state.code);
       
    
        
       
//           interval = setInterval(() => getdata(), 5000);
       
       
//     // this.getlocation()
//     // setInterval(this.componentDidMount.bind(this), 10000);
//     // Alert.alert(latitude,longitude);
//     // Geocoder.init('AIzaSyAo0-IwAm0tOz9I5c2Z6BQPoC78Pf1tBXs');
//     // Geocoder.from(41.89, 12.49)
//     // .then(json => {
//     //             // console.log(json);
//     //            var addressComponent = json.results[0].address_components;
              
//     //                        Alert.alert(addressComponent);
    
//     //                     })
     
//     //                     .catch(error => console.warn(error));
    
    
//       }
     
      
//      const componentWillUnmount=()=> {
//         clearInterval(interval);
//       }
//     componentDidMount();
//     componentWillUnmount();
  return (
    <>
       <View style={styles.container}>
    
    <MapView style={styles.map}
    showsUserLocation={true}
    zoomEnabled={true}
    Region={{
    latitude: state.latitude,
    longitude: state.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
 >
     {/* <MapView.Marker
  coordinate={this.state}
  title={"Your Location"}
  draggable /> */}
  {/* {mapMarkers} */}
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
  {/* <MyComponent /> */}
</View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[100, 400, 100]}
        borderRadius={15}
        renderContent={renderContent}
        
      />
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flex:300
    },
    map:
    {
      flex:300
  
    }
  });