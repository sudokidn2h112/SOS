import React, { Component } from 'react';
import { View, Text, Platform, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import {AccessToken, LoginButton, LoginManager} from 'react-native-fbsdk';
import Button from 'react-native-button';

export default  class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.unsubcriber = null;
        this.state = {
            isLogin : false,
            typedEmail : '',
            typedPassword : '',
            user : null,
        };

    }

    componentDidMount(){
        this.unsubcriber = firebase.auth().onAuthStateChanged( (changedUser) => {
            this.setState({user : changedUser})
        });
    }

    componentWillUnmount(){
        if(this.unsubcriber){
            this.unsubcriber();
        }
    }

    onAnonymousLogin = () => {
        firebase.auth().signInAnonymously()
            .then( () => {
                this.setState ({
                    isLogin :true,
                });
            })
            .catch(err => console.log(`Login failed: ${err}`))
    }

    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then( loginUser => {
                this.setState({ user: loginUser});
                console.log(`Regiter success with user: ${JSON.stringify(this.state.user)}`);
            })
            .catch(err => console.log(`Register failed with error : ${err}`))
    }

    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then( user => {
                // this.setState({ user: loginUser});
                console.log(`Login success with user: ${JSON.stringify(user)}`);
            })
            .catch(err => console.log(`Login failed with error : ${err}`))
    }

    onLoginFacebook = () => {
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then( result => {
                if(result.isCancelled) {
                    return Promise.reject(new Error(`The user called the request`));
                }
                console.log(`Login success with premission: ${result.grantedPermissions.toString()}`);
                //get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then( (data) => {  
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                return firebase.auth().signInWithCredential(credential);
            })
            .then ( curUser => {
                console.log(`Facebook login with user: ${JSON.stringify(curUser)}`);

            })
            .catch (err => {
                console.log(`Facebook login failed with error: ${JSON.stringify(err)}`);
            })
    }

    render () {
        return (
            <View style={{
                flex:1,
                alignItems:'center',
                backgroundColor:'white',
                borderRadius: Platform.OS === 'IOS' ? 30: 0
            }}>
                <Text style={{
                    fontSize:20,
                    fontWeight: 'bold',
                    textAlign:'center',
                    margin: 40
                }}>
                    Login with Firebase
                </Text>
                <Button
                    containerStyle = {{
                        padding:10,
                        borderRadius: 4,
                        backgroundColor: 'rgb(226,161,184)'
                    }} 
                    style={{
                        fontSize:18,
                        color: 'white',
                    }}
                    onPress = {this.onAnonymousLogin}    
                    >
                    Login anonymous
                </Button>
                <Text style={{margin:20, fontSize:15}}>{this.state.isLogin == true ? "Login in anonymous" : ''}</Text>
            
                <TextInput style={{
                    height:40,
                    width:200,
                    margin:10,
                    padding:10,
                    borderColor:'grey',
                    borderWidth:1,
                    color:'black'
                }}  
                underlineColorAndroid='transparent'
                keyboardType='email-address'
                placeholder='Enter your email'
                autoCapitalize='none'
                onChangeText = { (text) => {
                    this.setState({
                        typedEmail :text,
                    })
                }}  
                />
                <TextInput style={{
                    height:40,
                    width:200,
                    margin:10,
                    padding:10,
                    borderColor:'grey',
                    borderWidth:1,
                    color:'black'
                }} 
                underlineColorAndroid='transparent' 
                keyboardType='default'
                placeholder='Enter your password'
                secureTextEntry={true}
                onChangeText = { (txtPass) => {
                    this.setState({
                        typedPassword :txtPass,
                    })
                }}  
                /> 
                <View style={{flexDirection:'row'}}>
                    <Button containerStyle = {{
                        padding:10,
                        margin:10,
                        borderRadius:4,
                        backgroundColor:'green'
                    }}
                    style={{fontSize:17, color:'white'}}
                    onPress={this.onRegister}
                    >   
                        Register
                    </Button>
                    <Button containerStyle = {{
                        padding:10,
                        margin:10,
                        borderRadius:4,
                        backgroundColor:'blue'
                    }}
                    style={{fontSize:17, color:'white'}}
                    onPress={this.onLogin}
                    >   
                        Login
                    </Button>
                </View> 
                <Button
                    containerStyle = {{
                        padding:10,
                        with:150,
                        margin:20,
                        borderRadius: 4,
                        backgroundColor: 'rgb(73,104,173)'
                    }} 
                    style={{
                        fontSize:18,
                        color: 'white',
                    }}
                    onPress = {this.onLoginFacebook}    
                    >
                    Login by Facebook
                </Button>    
            </View>
        );
    }
};