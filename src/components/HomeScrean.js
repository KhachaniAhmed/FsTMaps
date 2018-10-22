import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Content, Card, Button } from 'native-base';
import HeaderComponent from './Header2';
const filtredKeys = [];
export default class HomeScrean extends Component {
    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    static navigationOptions = {
        drawerIcon: (
            <Image source={require('../images/homeicon.png')}
                style={{ height: 24, width: 24 }} />
        )
    }


    render() {
        return (
            <ImageBackground source={require('../images/back.jpg')}
                style={styles.Containr}>
                <Container>
                    <HeaderComponent openDrawer={() => this.openDrawer()}
                    />
                    <View style={styles.overlayContent}>
                        <Content contentContainerStyle={{
                            marginTop: 1
                        }}>
                            <View style={styles.row}>
                                <Button block large transparent style={styles.buttonLeft}
                                    onPress={() => this.props.navigation.navigate('main', { itemId: "Departement", homeRequest: true })}>
                                    <View style={styles.btnContent} >
                                        <Image source={require('../images/icon.png')} style={styles.btnImage} />
                                        <Text style={styles.btnText}>Departements</Text>
                                    </View>
                                </Button>

                                <Button block large transparent style={styles.buttonRight}
                                    onPress={() => this.props.navigation.navigate('main', { itemId: "Amphis", homeRequest: true })} >
                                    <View style={styles.btnContent} >
                                        <Image source={require('../images/icon.png')} style={styles.btnImage} />
                                        <Text style={styles.btnText} >Amphis</Text>
                                    </View>
                                </Button>
                            </View>

                            <View style={styles.row}>
                                <Button block large transparent style={styles.buttonLeft}
                                    onPress={() => this.props.navigation.navigate('main', { itemId: "Scolarite", homeRequest: true })}>
                                    <View style={styles.btnContent} >
                                        <Image source={require('../images/icon.png')} style={styles.btnImage} />
                                        <Text style={styles.btnText}>Scolarité</Text>
                                    </View>
                                </Button>

                                <Button block large transparent style={styles.buttonRight}
                                    onPress={() => this.props.navigation.navigate('main', { itemId: "Buvette", homeRequest: true })}>
                                    <View style={styles.btnContent} >
                                        <Image source={require('../images/icon.png')} style={styles.btnImage} />
                                        <Text style={styles.btnText} >Buvette</Text>
                                    </View>
                                </Button>
                            </View>

                            <View style={styles.row}>
                                <Button block large transparent style={styles.buttonLeft}
                                    onPress={() => this.props.navigation.navigate('main', { itemId: "Bibliotique", homeRequest: true })}>
                                    <View style={styles.btnContent} >
                                        <Image source={require('../images/icon.png')} style={styles.btnImage} />
                                        <Text style={styles.btnText}>Bibliothèque</Text>
                                    </View>
                                </Button>

                                <Button block large transparent style={styles.buttonRight}
                                    onPress={() => this.props.navigation.navigate('main', { itemId: "Mosque", homeRequest: true })}>
                                    <View style={styles.btnContent}>
                                        <Image source={require('../images/icon.png')} style={styles.btnImage} />
                                        <Text style={styles.btnText}>Mosqué</Text>
                                    </View>
                                </Button>
                            </View>
                        </Content>
                    </View>
                </Container >
            </ImageBackground >
        );
    }
}
const styles = StyleSheet.create({
    Containr: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    overlayContent: {
        flex: 1,
        backgroundColor: 'rgba(200,200,200,0.6)'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },
    buttonLeft: {
        marginLeft: 20,
        height: 135,
        width: 140,
        borderRadius: 5,
    },
    buttonRight: {
        marginRight: 20,
        height: 135,
        width: 140,
        borderRadius: 5,
    },
    btnContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnImage: {
        height: 75,
        width: 75
    },
    btnText: {
        fontSize: 22,
        color: '#0d2a51'
    }


});

