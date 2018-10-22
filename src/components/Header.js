import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button, Icon, Item, Input } from 'native-base';
import Voice from 'react-native-voice';
import Spinner from 'react-native-spinkit'
export default class HeaderComponent extends Component {
    state = {
        results: [],
        isModalOpen: false,
        iputValue: "",
    }
    constructor() {
        super();
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    }

    onSpeechStartHandler() {
        Voice.start('fr-FR');
    }
    onSpeechEndHandler() {
        Voice.stop();
        this.setState({
            results: "",
            isModalOpen: false,

        });
        const { setStateAfterRecord } = this.props;
        setStateAfterRecord();
    }
    onSpeechResultsHandler(e) {
        this.setState({
            results: e.value
        });
        const { addMarckers } = this.props;
        addMarckers(this.state.results);
    }
    onSpeechStart(e) {
        this.setState({
            isModalOpen: true
        })
    }
    OnchangeValue(value) {
        this.setState({ iputValue: value })
    }
    iconView() {
        if (this.state.iputValue <= 0) {
            return (
                <TouchableWithoutFeedback
                    onPress={this.onSpeechStartHandler.bind()}
                    onLongPress={this.onSpeechStartHandler.bind()}
                >
                    <View style={styles.button} >
                        <Icon name='mic' style={styles.buttonIcon} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else {
            const { rechercherSalle } = this.props;
            return (
                <TouchableWithoutFeedback
                    onPress={() => rechercherSalle(this.state.iputValue)}
                >
                    <View style={styles.button} >
                        <Icon name='search' style={styles.buttonIcon} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    filtrer(value) {
        const { filtrer } = this.props;
        this.setState({
            iputValue: value
        })
        filtrer(value)
    }
    render() {
        const { openDrawer, rechercherSalle} = this.props;
        return (
            <Header style={{backgroundColor: '#0d2a51' }}>
                <Left>
                    <Button transparent onPress={() => openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Right>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: "100%", width: 300, justifyContent: 'center', marginLeft: -50 }}>
                            <Item style={{ backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 4 }}>
                                <Icon name="search" style={{ fontSize: 24 }} />
                                <Input placeholder="Search" onChangeText={(value) => this.filtrer(value)} />
                            </Item>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {this.iconView()}
                        </View>
                    </View>
                </Right>
                <Modal visible={this.state.isModalOpen}
                    onRequestClose={() => this.setState({ isModalOpen: false })} animationType={"fade"}
                    transparent={true}>
                    <View  >
                        <View style={styles.model}>
                            <Item style={styles.modalContent} >
                                <Text>disez quelque chose </Text>
                                <Spinner style={styles.spinner} isVisible={true} size={50} type='ThreeBounce' color='red' />
                                <TouchableHighlight style={styles.cancelModalBtn}
                                    onPress={() => this.onSpeechEndHandler()}>
                                    <Text style={styles.cancelModalBtnText}>Annuler</Text>
                                </TouchableHighlight>
                            </Item>
                        </View>
                    </View>
                </Modal>
            </Header >
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginRight: -6,
    },
    buttonIcon: {
        padding: 20,
        color: 'white'
    },
    model: {
        justifyContent: 'center',
        marginTop: 170,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#f5f5dc',
        borderRadius: 70
    },
    modalContent: {
        padding: 30,
        justifyContent: 'space-between'
    },
    cancelModalBtn: {
    },
    cancelModalBtnText: {
        padding: 20,
        color: 'red'
    },
    spinner: {
        marginTop: 5,
    }
});