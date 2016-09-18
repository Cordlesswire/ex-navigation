import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ListItem from './ListItem';
import { Router } from '../main';

export default class HomeScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'Home',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    return (
      <View style={styles.container}>
        <ListItem
          title="Tab navigation"
          description="Tab bar based navigation for iOS"
          onPress={this._goToScreen('tabNavigationExample')}
        />
        <ListItem
          title="Sliding tab navigation"
          description="Swipeable animated tab navigation"
          onPress={this._goToScreen('slidingTabNavigationExample')}
        />
        <ListItem
          title="Drawer navigation"
          description="Drawer based navigation for Android"
          onPress={this._goToScreen('drawerNavigationExample')}
        />
        <ListItem
          title="Alert bars"
          description="Alert bars showing various messages"
          onPress={this._goToScreen('alertBarsExample')}
        />
        <ListItem
          title="Translucent bars"
          description="Blurred translucent navigation and tab bar on iOS"
          onPress={this._goToScreen('translucentBarExample')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
