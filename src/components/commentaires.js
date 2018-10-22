import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, Card, Button, Header, Left, Right, Icon, Item, Input } from 'native-base';
import HeaderComponent from './Header2';
import Voice from 'react-native-voice';
import Spinner from 'react-native-spinkit';
import email from 'react-native-email';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';


const filtredKeys = [];
export default class Comments extends Component {
    state = {
        emailBody: "",
        email: "",
        objet: "",
    }

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    static navigationOptions = {
        drawerIcon: (
            <Image source={require('../images/commenticon.png')}
                style={{ height: 24, width: 24 }} />
        )
    }

    render() {
        return (
            <Container>
                <HeaderComponent openDrawer={() => this.openDrawer()}
                />
                <View style={styles.container}>
                    <ScrollView>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row',padding:20 }}>
                            <Image source={require('../images/star.png')}
                                style={{ height: 60, width: 60 }} />
                            <Image source={require('../images/mstaar.png')}
                                style={{ height: 55, width: 55 }} />
                            <Image source={require('../images/wstaar.png')}
                                style={{ height: 60, width: 60 }} />
                        </View>
                        <View style={{ justifyContent: 'center', marginTop: 40 }}>
                            <TextInput
                                style={{ borderColor: 'rgba(200,200,200,0)' }}
                                onChangeText={(text) => this.setState({ objet: text })}
                                value={this.state.text}
                                placeholder={'Entrez votre Objet ...'}
                            />

                            <AutoGrowingTextInput style={{ borderColor: 'rgba(200,200,200,0)', marginTop: 50 }}
                                placeholder={'Entrez votre commentaire'}
                                onChangeText={(text) => this.setState({ emailBody: text })}
                                value={this.state.text} />
                        </View>
                        <TouchableWithoutFeedback onPress={this.handleEmail}  >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Envoyer</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Container>
        );
    }
    handleEmail = () => {
        const to = ['bouzekryhanane@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: this.state.email, // string or array of email addresses

            subject: this.state.objet,
            body: this.state.emailBody
        }).catch(console.error)
    }
}
const styles = StyleSheet.create({

    container: {
        height: '100%',
        padding: 20,
        backgroundColor: 'rgba(200,200,200,.5)'
    },
    button: {
        marginTop: 100,
        width: 400,
        backgroundColor: '#0d2a51'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 22,
        marginRight:70,
    }

});

