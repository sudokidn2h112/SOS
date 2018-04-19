import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

var screen = Dimensions.get('window');
export default class AddModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            address: "",
            msg : "",
            height: 10,
        }
    }
    showAddModal = (marker) => {
        this.setState({
            user: marker.title,
            address: marker.description
        })
        this.refs.myModal.open();
    }
    _onSendSOS = () => {
        if(this.state.msg == null || this.state.msg.length == 0){
            alert(`Nhập nội dung cần hiếp zu`);
        }else{
            alert(`Send to dog: ${this.state.user} - ${this.state.address} - ${this.state.msg}`);
        }
    }
    updateSize = (height) => {
        this.setState({
          height
        });
      }
    render() {
        let {height} = this.state;
        return (
            <Modal
                ref={"myModal"}
                style={styles.modal}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >  
            <View style={{flex:1, flexDirection:'column'}}> 
                <View style={{flex:1,flexDirection:'column', backgroundColor:'red'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.user}>User : 
                                <Text style={{fontSize:13, fontStyle:'italic'}}>{this.state.user}</Text>
                            </Text>        
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.address}>Address : 
                                <Text style={{fontSize:13, fontStyle:'italic'}}>{this.state.address}</Text>
                            </Text>                           
                        </View>
                    </View>
                    <View style={{flex:2, backgroundColor:'yellow'}}>
                        <TextInput
                            style={styles.txtImput}  
                            editable={true}
                            multiline={true} 
                            underlineColorAndroid='transparent'        
                            onChangeText={(text) => this.setState({ msg: text })}
                            placeholder="Enter content helper"
                            value={this.state.msg} 
                            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}                
                        />
                    </View>
                </View>
                <Button
                     style={{ fontSize: 18, color: 'red' }}
                     containerStyle={styles.btnContainer}
                     onPress={ () => this._onSendSOS()}
                >
                    Send SOS
                </Button>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modal : {
        justifyContent: 'center',
        borderRadius: Platform.OS === 'ios' ? 30 : 0,
        shadowRadius: 10,
        width: screen.width - 80,
        height: 300
    },
    user: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 2,
    },
    address: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        marginBottom: 2,
    },
    txtImput: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 3,
        alignItems: 'stretch',
        height: 40,
    },
    btnContainer:{
        padding: 8,
        marginLeft: 70,
        marginRight: 70,
        marginBottom: 10,
        marginTop: 10,
        height: 40,
        borderRadius: 6,
        backgroundColor: 'mediumseagreen'
    }
});