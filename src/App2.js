import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Container, Content, Header, Body } from 'native-base';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import HomeScrean from './components/HomeScrean';
import MainScrean from './components/main';
import EventsScreen from './components/EventsScreen';
import BodyContent from './components/commentaires';
import MarkerDetails from './components/markerDetails';
import Available from './components/available';
import SplashScreen from 'react-native-smart-splash-screen'
import About from './components/about';


export default class App extends Component {
    //    componentDidMount() {
    //        SplashScreen.close({
    //            animationType: SplashScreen.animationType.scale,
    //            duration: 850,
    //            delay: 500
    //        });
    //    }

    render() {
        {console.disableYellowBox=true}
        return (
            <MyApp />
        );
    }
}

const CustomDrawerContentComponent = (props) => (

    <Container>
        <Header style={{ height: 150, backgroundColor: '#0d2a51' }}>
            <Body style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                    <Image
                        style={styles.drawerImage}
                        source={require('./images/logo2.png')} />
                    <Text style={{ fontSize: 36, color: 'white', marginTop: 50 }}>FS Tétouan</Text>
                </View>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
);

const MyApp = DrawerNavigator({
    Accueil: {
        screen: HomeScrean
    },
    main: {
        screen: MainScrean
    },
    Disponibilité: {
        screen: Available
    },
    Evenements: {
        screen: EventsScreen
    },
    Commentaire: {
        screen: BodyContent
    },
    "À propos": {
        screen: About
    },
    details: {
        screen: MarkerDetails,
        navigationOptions: {
            drawerLabel: () => null
        }
    }
}, {
        initialRouteName: 'Accueil',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    })


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerImage: {
        height: 120,
        width: 80
    }

});
