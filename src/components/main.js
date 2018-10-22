import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Button, Icon, Header, Left, Right, Body, Title, Row } from 'native-base';
import MapView from 'react-native-maps';
import HeaderComponent from './Header';
import mapImage from '../images/MapFst.png';
import firebase from '../firebase/firebase';
import PopupDialog, { DialogTitle, DialogButton, SlideAnimation } from 'react-native-popup-dialog';
import keys from './Data/names';
import markers from './Data/markers'
import voiceKeys from './Data/voiceKeys'

const leftTop = [35.562895, -5.365644];
const rightBottom = [35.559715, -5.360546];
const rootRef = firebase.database().ref("/Location");
const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const filtredKeys = [];

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};


let categorie = "";
export default class MainScrean extends Component {
    constructor(props) {
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        super();
        this.state = {
            loaded: false,
            marker: [],
            latitude: 35.561224,
            longitude: -5.362440,
            error: "",
            dialogShow: false,
            popUpInfos: [{
                title: "",
                key: "",
                description: ""
            }],
            inputValue: ""
        }
    }
    static navigationOptions = {
        drawerLabel: 'Carte',
        drawerIcon: (
            <Image source={require('../images/mapsicon.png')}
                style={{ height: 24, width: 24 }} />
        )
    }


    openDrawer() {
        this.props.navigation.navigate("DrawerOpen");
    }

    componentDidMount() {

        this.chargerMarkerFromFirebase()
    }




    setStateAfterRecord() {
        this.setState({
            loaded: true
        })
    }

    addMarckers(keys) {
        if (keys) {
            this.rechercheParType(this.isContanis(keys));
        }
    }
    isContanis(keys) {
        for (let index = 0; index < voiceKeys.length; index++) {
            for (let i = 0; i < voiceKeys[index].words.length; i++) {
                for (let j = 0; j < keys.length; j++) {
                    if (voiceKeys[index].words[i] == keys[j]) {
                        return voiceKeys[index].key;
                    }
                }
            }
        }
        return "no-Id";
    }


    //Recherche 
    rechercheParType(val) {
        rootRef.child(val).once('value', (childSnapshot) => {
            const items = [];
            childSnapshot.forEach((child) => {
                var childJson = child.toJSON();
                items.push({
                    key: child.key,
                    description: childJson.description,
                    latitude: childJson.latitude,
                    longitude: childJson.longitude,
                    title: childJson.title,
                    color: childJson.color
                })
            })
             if (items[0] != null)
             this.setState({
                marker: items,
                latitude: items[0].latitude,
                longitude: items[0].longitude
            })
        })
    }

    rechercherSalle(id_salle) {
        this.rechercheParType(id_salle);
        this.setState({
            inputValue: ""
        });
        Keyboard.dismiss();
    }

    popUpShow(marker) {
        categorie = marker.title;
        this.setState({
            popUpInfos: marker
        })
        this.slideAnimationDialog.show();
    }
    filtrer(x) {
        filtredKeys = keys.filter((item) => item.key.toLowerCase().contains(x.toLowerCase()));
        this.setState({
            inputValue: x
        })
    }
    showFlatList() {
        if (filtredKeys[0] != null && this.state.inputValue != "") {
            return (
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.listContainer}>
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={filtredKeys}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={styles.listItem} onPress={() => this.rechercherSalle(item.value)}>
                                    <Text>{item.key}</Text>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </ScrollView>
            )
        }
    }
    chargerMarkerFromFirebase() {
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        this.rechercheParType(itemId)
    }
    isSalleOrAmphi() {
        if (categorie.contains("Salle") || categorie.contains("Amphi")) {
            return (
                <DialogButton
                    textStyle={{ color: 'white' }}
                    text="+Details"
                    onPress={() => {
                        this.props.navigation.navigate('details', { markerInfos: this.state.popUpInfos });
                    }}
                    key="button-1"
                />
            )
        }
    }
    

    render() {
        const mapMarkers = this.state.marker.map((markerInfo) =>
            <MapView.Marker
                coordinate={{ latitude: markerInfo.latitude, longitude: markerInfo.longitude }}
                key={markerInfo.key == null ? markerInfo.id[0] : markerInfo.key}
                onPress={() => this.popUpShow(markerInfo)}
            />);
        return (
            <Container>
                <HeaderComponent openDrawer={() => this.openDrawer()}
                    addMarckers={(x) => this.addMarckers(x)}
                    setStateAfterRecord={() => this.setStateAfterRecord()}
                    rechercherSalle={(id_salle) => this.rechercherSalle(id_salle)}
                    filtrer={(x) => this.filtrer(x)}
                />
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0025,
                            longitudeDelta: 0.0025,
                        }}
                        showsUserLocation={true}
                        followsUserLocation

                    >
                        {mapMarkers}
                        <MapView.Overlay bounds={[leftTop, rightBottom]} image={mapImage} />
                    </MapView>
                    {this.showFlatList()}
                    <PopupDialog
                        dialogTitle={<DialogTitle title={this.state.popUpInfos.title} titleTextStyle={{ color: '#0d2a51' }} />}
                        ref={(popupDialog) => {
                            this.slideAnimationDialog = popupDialog;
                        }}
                        dialogAnimation={slideAnimation}
                        actions={[
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0d2a51' }} key="1">
                                {this.isSalleOrAmphi()}
                                <DialogButton
                                    text="Fermer"
                                    textStyle={{ color: 'white' }}
                                    onPress={() => {
                                        this.slideAnimationDialog.dismiss();
                                    }}
                                    key="button-2"
                                />
                            </View>

                        ]}
                    >
                        <View style={styles.dialogContentView}>
                            <Text>{this.state.popUpInfos.description}</Text>
                        </View>
                    </PopupDialog>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    listContainer: {
        width: 235,
        maxHeight: 300,
        marginLeft: '10%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 15,
        marginRight: 20,
    },
    listItem: {
        borderBottomColor: 'red',
        height: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        flex: 1
    }
});







