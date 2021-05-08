import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Chat extends Component {
  // {id:1, date:"9:51 am", type:'out',  message: "Hi",name:"umer"},
  // {id:2, date:"9:52 am", type:'out', message: "How are you?",name:"umer"} ,
  // {id:3, date:"9:53 am", type:'in',  message: "I'm fine " ,name:"Moazzam"}, 
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      insert: [],
      id:'',name:'',
      msg:'',
      time:'',
      code:'',
    };
  }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }
  get_id = async () => {
    // alert("go")
    try {
       values = await AsyncStorage.getItem('id')
       name_id = await AsyncStorage.getItem('mykey')
        this.setState(
          {
            id:values,
            name:name_id,
            
          }
          
        )
       
      
    } catch(e) {
      // error reading value
    }
    // console.log(this.state.id)
    // alert(this.state.id)
    
  }
//   GetTime = ()=> {

//     var hours = new Date().getHours(); //To get the Current Hours
// var min = new Date().getMinutes(); //To get the Current Minutes
// var sec = moment().format(' h:mm:ss a')
//     this.setState({

//       time: moment().format('MMMM Do YYYY, h:mm:ss a')

//     });
//     alert(sec)
//   }
  sendmsg = async () =>
  {
    this.setState({
      code:await AsyncStorage.getItem('code_value'),
      id : await AsyncStorage.getItem('id')
    })
    alert('test')
    var sec = moment().format(' h:mm a')
    this.get_id()
    fetch("https://aumurussports.com/msgdata.php?member_id="+this.state.id+"&name="+this.state.name+"&msg="+this.state.msg+"&time="+sec+"&ride_code="+this.state.code)
  .then(res => res.json())
  .then(data2 => {
  this.setState({ insert: data2 })
  // Alert.alert()
  console.log("https://aumurussports.com/msgdata.php?member_id="+this.state.id+"&name="+this.state.name+"&msg="+this.state.msg+"&time="+sec+"&ride_code="+this.state.code)
  
  })
  .catch(console.error)
  this.setState(
    {
      msg:''
    }
  )
  this.getdata()
  }
  getdata =() =>
  {
    this.get_id()
    fetch('https://aumurussports.com/chatbot.php')
  .then(res => res.json())
  .then(data1 => {
  this.setState({ data: data1 })
  // Alert.alert()
  
  })
  .catch(console.error)
  }
  componentDidMount = () =>
{
  // Alert.alert(this.state.code);
  
  this.getdata()
  // this.interval = setInterval(() => this.get_id(), 5000);
  this.interval = setInterval(() => this.getdata(), 5000);
 
}

componentWillUnmount() {
  clearInterval(this.interval);
}

  render() {

    return (
      <View style={styles.container}>
        {/* <Text style={{marginLeft:1,marginTop:-6}}>Umer</Text> */}
        <FlatList style={styles.list}
        
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(message) => {
            // console.log(item);
            
            const item = message.item;
            let inMessage = item.member_id === this.state.id;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
              
            
                <View style={[styles.balloon]}>
                <View style={{marginTop:-5}}><Text>{item.name}</Text></View>  
                  <Text>{item.message}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
                {!inMessage && this.renderDate(item.date)}
              </View>
             
            )
          }}/>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                 value={this.state.msg}
        onChangeText={(msg) => this.setState({ msg})}/>
          </View>

            <TouchableOpacity style={styles.btnSend} onPress={()=>this.sendmsg()}>
              <Image source={{uri:"https://img.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list:{
    paddingHorizontal: 17,
    marginTop:25
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 350,
    padding: 15,
    borderRadius: 10,
  },
  itemIn: {
    alignSelf: 'flex-end',
    backgroundColor:"white",
   
  },
  itemOut: {
    alignSelf: 'flex-start',
    backgroundColor:"white",
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:10,
    padding:2,
  },
}); 