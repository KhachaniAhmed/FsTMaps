import React, { Component } from 'react';
import { View, Image, } from 'react-native';
import { Header, Left, Right, Button, Icon } from 'native-base';
import Voice from 'react-native-voice';
import Spinner from 'react-native-spinkit'
export default class HeaderComponent extends Component {
    render() {
        const { openDrawer } = this.props;
        return (
            <Header style={{ backgroundColor: '#0d2a51' }}>
                <Left>
                    <Button transparent onPress={() => openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Right>
                    <View style={{ marginBottom: 5,alignItems:'center' ,marginRight:30 }}>
                         <Image source={require('../images/UAE.png')}
                      style={{ height: 65, width: 250 }} />
                    </View>
                </Right>
            </Header >
        );
    }
}
