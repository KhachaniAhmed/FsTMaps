import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Header, Left, Right, Body, Title } from 'native-base';
import HeaderComponent from './Header';
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import MapView from 'react-native-maps';
import mapImage from '../images/FSTMaps.png';
const leftTop = [35.562784, -5.365009];
const rightBottom = [35.560406, -5.360535];
import emplois from './Data/markers'

let markerInfos = [];
let emploi = [];
let day = 0;
let hour = 8;
let index = 0;
dateRechercher = new Date();
hours = ["8H a 10H", "10H a 12H", "12H a 14H", "14H a 16H", "16H a 18H"];
days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
export default class MarkerDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { date: Moment(new Date, 'DD-MM-YYYY HH:mm').format() }
    }
    back() {
        this.props.navigation.navigate('main');
    }
    componentWillMount() {
        markerInfos = this.props.navigation.getParam('markerInfos', 'NO-Key');
        emplois.forEach(element => {
            if (element.key == markerInfos.key) {
                emploi = element.emploi;
            }
        });
        dateRechercher = new Date();
        this.getIndexByDate(dateRechercher);
    }
    getIndexByDate(date) {
        hour = date.getHours();
        day = date.getDay() - 1;
        if (day < 0) {
            day = 0;
            hour = 8;
            dateRechercher = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        }
        if (hour > 17) {
            hour = 8;
            day=day+1;
            dateRechercher = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        } else if (hour < 8) {
            hour = 8;
        }
        index = this.getIndexOfHour(hour);
    }

    getIndexOfHour(hour) {
        const hoursTable = [[8, 9], [10, 11], [12, 13], [14, 15], [16, 17]];
        for (let i = 0; i < hoursTable.length; i++) {
            for (let j = 0; j < hoursTable[i].length; j++) {
                if (hoursTable[i][j] == hour) {
                    return i;
                }
            }
        }
    }
    dateChange(datetime) {
        dateRechercher = Moment(datetime, 'YYYY-MM-DD HH:mm').toDate()
        this.getIndexByDate(dateRechercher);
        this.setState({
            date: datetime
        })
    }
    getDetails() {
        if (emploi[day][index].free == false) {
            return (
                <View style={styles.nonVideDetails} >
                    <Text style={styles.detailsText}>Professeur : {emploi[day][index].prof}  </Text>
                    <Text style={styles.detailsText}>Module : {emploi[day][index].module}  </Text>
                    <Text style={styles.detailsText} s>Filière : {emploi[day][index].filiere}  </Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 20 }}> Non occupée </Text>
                </View>
            )
        }
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#0d2a51' }}>
                    <Left>
                        <Button transparent onPress={() => this.back()} >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Right style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ color: 'white', fontSize: 20, }}>{markerInfos.title}</Text>
                        </View>
                    </Right>
                </Header>
                <Content contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: markerInfos.latitude,
                            longitude: markerInfos.longitude,
                            latitudeDelta: 0.0025,
                            longitudeDelta: 0.0025,
                        }} >
                        <MapView.Marker
                            title={markerInfos.title}
                            coordinate={{ latitude: markerInfos.latitude, longitude: markerInfos.longitude }}
                            pinColor="red"
                        />
                        <MapView.Overlay bounds={[leftTop, rightBottom]} image={mapImage} />
                    </MapView>

                    <View style={styles.container}>
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>{days[day] + " " + Moment(dateRechercher).format('DD-MM-YYYY') + " De " + hours[index]}</Text>
                        {this.getDetails()}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 60 }}>
                            <Text style={{ fontSize: 14, marginRight: 20, marginTop: 10 }}>Choisir une Date</Text>
                            <DatePicker
                                style={{ marginRight: -100 }}
                                date={this.state.date}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                hideText={true}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(datetime) => this.dateChange(datetime)}
                            />
                        </View>
                    </View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: markerInfos.latitude,
                            longitude: markerInfos.longitude,
                            latitudeDelta: 0.0010,
                            longitudeDelta: 0.0010,
                        }} >
                        <MapView.Marker
                            title={markerInfos.title}
                            coordinate={{ latitude: markerInfos.latitude, longitude: markerInfos.longitude }}
                            pinColor="red"
                        />
                        <MapView.Overlay bounds={[leftTop, rightBottom]} image={mapImage} />
                    </MapView>

                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 250,
    },
    detailsText: {
        fontSize: 18
    },
    nonVideDetails: {
        marginTop: 20,
    },
    mapContainer: {
        height: 300
    }, map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        height: 250
    }
});
