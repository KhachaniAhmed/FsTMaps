import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, Card, Button, Header, Left, Right, Icon, Item, Input } from 'native-base';
import HeaderComponent from './Header2';


export default class About extends Component {

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen')
      }

      static navigationOptions = {
        drawerIcon: (
            <Image source={require('../images/about.jpg')}
                style={{ height: 24, width: 24 }} />
        )
    }  

    render() {
        return (
            <Container>
            <HeaderComponent openDrawer={() => this.openDrawer()} />
            <Content>
            <Text style={{ fontSize: 26, color: '#0d2a51', marginTop: 50,textAlign:'center' }}> Développée par : </Text>
            <View style={{padding:10}}>
            <View  style={{borderColor: '#0d2a51', borderRadius: 4, borderWidth: 15,paddingLeft:20,paddingRight:20}}>
                <View style={styles.container}>
               <Text style={styles.names} >BOUZEKRY Hanane</Text>
               <Text style={styles.names} >M2I </Text>
               </View>
                <View style={styles.container}>
               <Text style={styles.names} >KHACHANI Ahmed</Text>
               <Text style={styles.names} >MQL </Text>
               </View>
                <View style={styles.container}>
               <Text style={styles.names} >HADDAD Hamza</Text>
               <Text style={styles.names} >MQL </Text>
               </View>
                <View style={styles.container}>
               <Text style={styles.names} >AIT BASSOU Ali</Text>
               <Text style={styles.names} >MQL </Text>
               </View>
           </View>
           </View>
            <Text style={{ fontSize: 26, color: '#0d2a51', marginTop: 50,  textAlign:'center'}} >Encadrée par : </Text>
            <Text style={{ fontSize: 20, color: 'black', marginTop: 20,textAlign:'center', fontWeight:'bold'}}>Pr.EL MOHAJIR Badr Eddine</Text>
            <Text style={{bottom:0,textAlign:'center' ,marginTop:60}}>© 2017-2018</Text>
            </Content>
            </Container>

        )}

}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    names: {
        fontSize: 18,
         color: 'black',
          marginTop: 10,
          marginBottom: 10,
          textAlign:'center',
           alignItems:'center',
           justifyContent: 'space-between',
            flexDirection: 'row',
            
    },
  

});