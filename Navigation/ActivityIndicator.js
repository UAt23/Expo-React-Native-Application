import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');




class ActivityIndicatorExample extends Component {
    state = { animating: true }
    closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 60000)
    componentDidMount = () => this.closeActivityIndicator()
    render() {
        const animating = this.state.animating
        return (
            <View style = {styles.container}>
                <ActivityIndicator
                animating = {animating}
                color = '#36d42d'
                size = "large"
                style = {styles.activityIndicator}/>
            </View>
        )
    }
}
export default ActivityIndicatorExample
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
})