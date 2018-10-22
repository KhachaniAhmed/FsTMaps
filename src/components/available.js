import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Container, Content, Card } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import HeaderComponent from './Header2';
import keys from './Data/sallesAmphis';
import emplois from './Data/markers';

items = [];
let day = 0;
let hour = 8;
let index = 0;
dateRechercher = new Date();
let itemIndexOld = 0;
let itemIndex = 0;
let datePickerMode = "datetime";
hours = ["8H a 10H", "10H a 12H", "12H a 14H", "14H a 16H", "16H a 18H"];
days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default class Available extends Component {
  state = {
    date: Moment(new Date, 'DD-MM-YYYY HH:mm').format(),
    indexSelected: 0
  }
  static navigationOptions = {
    drawerIcon: (
      <Image source={require('../images/clock.png')}
        style={{ height: 24, width: 24 }} />
    )
  }
  openDrawer() {
    this.props.navigation.navigate('DrawerOpen')
  }
  componentWillMount() {
    this.dateChange(Moment(new Date, 'DD-MM-YYYY HH:mm').format());
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
      day = day + 1;
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
    if (itemIndexOld > 0) {
      this.getOne();
    } else {
      this.getAll();
    }
    this.setState({
      date: datetime
    })
  }
  onSelect(index) {
    itemIndex = index;
    itemIndexOld = index;
    this.getIndexByDate(dateRechercher);
    if (itemIndexOld > 0) {
      datePickerMode = "date"
      itemIndex -= 1;
      this.getOne();
    } else {
      datePickerMode = "datetime"
      this.getAll();
    }
    this.setState({
      indexSelected: index
    })
  }
  getAll() {
    list = [];
    for (let i = 0; i < emplois.length; i++) {
      if (emplois[i].emploi[day][index].free) {
        list.push(keys[i + 1].key);
      }
    }
    items = list;
  }
  getOne() {
    list = [];
    emploi = emplois[itemIndex].emploi[day];
    for (let i = 0; i < emploi.length; i++) {
      if (emploi[i].free) {
        list.push(hours[i]);
      }
    }
    items = list;
  }

  showDate() {
    if (itemIndexOld == 0) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.dateText}>{days[day] + " " +  Moment(dateRechercher).format('DD-MM-YYYY') + " De " + hours[index]}</Text>
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.dateText}>{keys[itemIndexOld].key + " est disponible le " + days[day] + " " + Moment(dateRechercher).format('DD-MM-YYYY') + " à"}</Text>
        </View>
      )
    }

  }
  showResult() {
    if (itemIndexOld == 0) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {items.map((item) =>
            <Card key={item} >
              <View style={{ marginBottom: 5 }}>
                <Text style={{ width: 200, textAlign: 'center', color: '#0d2a51' }} >{item}</Text>
              </View>
            </Card>
          )}
        </View>
      )
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {items.map((item) =>
            <Card key={item} >
              <View style={{ marginBottom: 5 }}>
                <Text style={{ width: 200, textAlign: 'center', color: '#0d2a51' }} >{item}</Text>
              </View>
            </Card>
          )}
        </View>
      )
    }
  }
  render() {
    return (
      <Container>
        <HeaderComponent openDrawer={() => this.openDrawer()} />
        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>Salle/Amphis</Text>
            <ModalDropdown defaultValue="-- SELECT --"
              options={keys.map((item) => item.key)}
              onSelect={(selectedItem) => this.onSelect(selectedItem)}
              textStyle={{ width: 120, fontSize: 16, borderWidth: 1, borderColor: '#0d2a51', color: '#0d2a51', textAlign: 'center', marginLeft: 10 }}
              dropdownTextHighlightStyle={{ color: 'green', fontSize: 15, backgroundColor: 'rgba(255,255,255,.8) ' }} dropdownStyle={{ minWidth: 120, minHeight: 250, marginLeft: 10, backgroundColor: 'green' }}
              dropdownTextStyle={{ color: '#0d2a51', fontSize: 14 }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 30 }}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
              style={{ marginLeft: 10, marginTop: -10 }}
              date={this.state.date}
              mode={datePickerMode}
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              hideText={true}
              customStyles={{
                dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
                dateInput: { marginLeft: 36 }
              }}
              minuteInterval={10}
              onDateChange={(datetime) => this.dateChange(datetime)}
            />
          </View>
        </View>

        {this.showDate()}
        <Content contentContainerStyle={{ backgroundColor: 'white' }}>
          {this.showResult()}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 14,
    color: '#0d2a51'
  }, dateText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#0d2a51' }
});