import React, {Component} from 'react';
import { StyleSheet,Text,View, Image, TouchableOpacity, Platform } from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import AddModal from './AddModal';
export default class SOS_Map extends Component {
    constructor(props){
    super(props);
    this.state={
      marker : {},
      color : '#81BD26',
      region : {
        latitude: 16.0524594,
        longitude: 108.1856547,
        longitudeDelta:0.08,
        latitudeDelta:0.08,
      },
      markers:[
        {
          title:'Dân chợ Hòa Khánh',
          description: 'Đây là khu nhà Hoàng đập chai',
          coordinates:{
            latitude: 16.0704497,
            longitude: 108.1468659,
            longitudeDelta:0.1,
            latitudeDelta:0.1,
        },
      },
      {
          title:'Dân chợ Bắc Mỹ An',
          description: 'Đây là khu nhà Dũng bb',
          coordinates:{
            latitude: 16.0417187,
            longitude: 108.2402004,
            longitudeDelta:0.08,
            latitudeDelta:0.08,         
        },
    },
    {
          title:'StartLight Nguyên Kim',
          description: 'Đây là khu nhà Tró Trí',
          coordinates:{
            latitude: 16.0662446,
            longitude: 108.2011324,
            longitudeDelta:0.08,
            latitudeDelta:0.08,    
        },
    },
    {
          title:'Quán cơm ngon nhất quả đất',
          description: 'Nhà gấu mẹ',
          coordinates:{
            latitude: 16.065883,
            longitude: 108.1974723,
            longitudeDelta:0.08,
            latitudeDelta:0.08,
          },
    }
    ]
    }
    }
        
    _onPressAdd (e) {
      this.state.markers.filter(marker => {
        if(marker.coordinates.latitude == e.coordinate.latitude){
          this.refs.addModal.showAddModal(marker);
        }
      })
  }
    render() {

        return (
          <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
                    <MapView style={styles.map}
                    region={this.state.region}
                    showsUserLocation ={true} 
                    rotateEnabled = {true}
                    zoomEnabled = {true}
                    showsMyLocationButton = {true}
                    onRegionChangeComplete={(region) => {
                        console.log(" region", region) 
                  }}>
                    
                    {this.state.markers.map(marker =>   (
                        <Marker 
                        key={marker.coordinates.longitude}
                        coordinate={marker.coordinates}
                        title={marker.title}
                        description={marker.description}
                        image = {require('../images/avatar.png')}
                        onPress={e => this._onPressAdd(e.nativeEvent)}
                        >
                        {/*  ======custom image for marker==========

                        <View style={styles.imgView}>
                            <Image source={require('../images/avatar.png')} style={styles.img}/>
                        </View> */}
                        
                        {/* <View style={styles.radius}>
                        <View style={styles.markerStyle}/>
                        </View>  */}
                      </Marker>
                    ))} 
                    </MapView> 
                    <AddModal ref={'addModal'} parentFlatList={this} > </AddModal>
                    </View>
        );
    }
}

const styles=StyleSheet.create({
  container:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  map:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  radius:{
    height:15,
    width:15,
    backgroundColor:'#81BD26',
    overflow:'hidden',
    borderRadius:50/2,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  markerStyle:{
    height:14,
    width:14,
    backgroundColor:'#81BD26',
    alignItems:'center',
    justifyContent:'center'
  },
  imgView: {
    height:40,
    width:40,
    // backgroundColor:'#81BD26',
    borderRadius:40/2,
  },
   img: {
    width:40, 
    height:40,
   }
});