import React from 'react';
import { StatusBar } from 'react-native';
import Exponent from 'exponent';
import HomeScreen from './components/HomeScreen';
import TranslucentBarExample from './components/TranslucentBarExample';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
export const Router = createRouter(() => ({
  home: () => HomeScreen,
  tabNavigationExample: () => null,
  slidingTabNavigationExample: () => null,
  drawerNavigationExample: () => null,
  alertBarsExample: () => null,
  translucentBarExample: () => TranslucentBarExample,
}));

class App extends React.Component {
  render() {
    /**
      * NavigationProvider is only needed at the top level of the app,
      * similar to react-redux's Provider component. It passes down
      * navigation objects and functions through context to children.
      *
      * StackNavigation represents a single stack of screens, you can
      * think of a stack like a stack of playing cards, and each time
      * you add a screen it slides in on top. Stacks can contain
      * other stacks, for example if you have a tab bar, each of the
      * tabs has its own individual stack. This is where the playing
      * card analogy falls apart, but it's still useful when thinking
      * of individual stacks.
      */
    return (
      <NavigationProvider router={Router}>
        <StatusBar barStyle="light-content" />
        <StackNavigation
          defaultRouteConfig={{
            navigationBar: {
              backgroundColor: '#0084FF',
              tintColor: '#fff',
            },
          }}
          initialRoute={Router.getRoute('home')}
        />
      </NavigationProvider>
    );
  }
}

Exponent.registerRootComponent(App);
