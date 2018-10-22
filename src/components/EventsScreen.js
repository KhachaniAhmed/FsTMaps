import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Container, Content, Button, Icon, Header, Left, Right, Body, Title } from 'native-base';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import HeaderComponent from './Header2';

const { width, height } = Dimensions.get('window')
export default class EventsScreen extends Component {

    static navigationOptions = {
        drawerIcon: (
            <Image source={require('../images/eventsicon.png')}
                style={{ height: 24, width: 24 }} />
        )
    }
    openDrawer() {
        this.props.navigation.navigate('DrawerOpen')
    }

    callFun = () => {
        alert("Image Clicked!!!");
    }
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        },
            this.state = {
                isRefreshing: false,
            };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <Container>
                <HeaderComponent openDrawer={() => this.openDrawer()} />
                <View style={[{ flex: 1 }, styles.body]}>
                    <ScrollView style={styles.scrollContainer}>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/react.jpg')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Formation initiale sur les composantes de react-native"
                                />
                                <CardContent text="Date : 20/07/2018 à 10h30, Salle 43" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={this.callFun}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/arduino.jpeg')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Formation sur la programmation de la carte Arduino"
                                />
                                <CardContent text="Date : 14/06/2018 à 9h30, Salle 9" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/ecologie.png')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Formation en ecologie"
                                />
                                <CardContent text="Date : 14/11/2018 à 08h30, Salle 9" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/irace.jpg')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Compétition des voitures de coures autonomes"
                                />
                                <CardContent text="Date : 30/06/2018 à 08h30, Amphi F" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/solaire.jpg')}
                                    title="" />
                                <CardTitle
                                    subtitle="Formation sur les énérgies renouvelables" />
                                <CardContent text="Date : 14/12/2018 à 11h30, Salle 42" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/everis.png')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Journée de recrutement de 200 étudiants"
                                />
                                <CardContent text="Date : 14/12/2018 à 9h30, Salle 42" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/rencontre.jpg')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Rencontre avec le Directeur de l'IMIST : Accès aux ressources bibliographiques pour doctorants et des étudiants de Masters"
                                />
                                <CardContent text="Date : 22/06/2018 à 10h30, Amphi F" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/angular.png')}
                                    title=""
                                />
                                <CardTitle
                                    subtitle="Formation basique sur Angular"
                                />
                                <CardContent text="Date : 27/09/2018 à 10h30, salle31" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton
                                        onPress={() => { }}
                                        title="Voir plus"
                                        color="#0d2a51"
                                    />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage source={require('../image/prepa.jpg')} title="" />
                                <CardTitle subtitle=" Journée de préparation aux entretiens d'embauche" />
                                <CardContent text="Date : 28/11/2018 à 9h30, salle42" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>  
                                    <CardButton onPress={() => { }} title="Voir plus" color="#0d2a51" />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.callFun}>
                            <Card>
                                <CardImage
                                    source={require('../image/formation-ipv6.png')} title="" />
                                <CardTitle subtitle=" Formation IP V6" />
                                <CardContent text="Date : 30/04/2018 à 10h30, salle42" />
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <CardButton onPress={() => { }} title="Voir plus" color="#0d2a51" />
                                </CardAction>
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    body: {

        backgroundColor: 'rgba(200,200,200,0.6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {

    },
    scrollContainer: {
        width: width
    }
})