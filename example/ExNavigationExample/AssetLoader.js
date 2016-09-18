import React, { Component, PropTypes, Children } from 'react';
import { Asset, Components } from 'exponent';

const preloadModuleList = [];
const preloadFontList = [];

function preloadModules(modules) {
  preloadModuleList.push(...modules);
}

function preloadFonts(fonts) {
  preloadFontList.push(...fonts);
}

function loadAssetsAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const promises = [];
      while (preloadModuleList.length) {
        const module = preloadModuleList.pop();
        promises.push(
          Asset.fromModule(module).downloadAsync()
        );
      }
      while (preloadFontList.length) {
        const font = preloadFontList.pop();
        promises.push(
          Asset.Font.loadAsync(font)
        );
      }
      try {
        await Promise.all(promises);
        resolve();
      } catch (e) {
        reject(e);
      }
    }, 0);
  });
}

export default class AssetLoader extends Component {
  static propTypes = {
    renderLoading: PropTypes.func,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    renderLoading: () => <Components.AppLoading />,
  };

  static preloadModules = preloadModules;
  static preloadFonts = preloadFonts;
  static loadAssetsAsync = loadAssetsAsync;

  state = {
    loaded: false,
  };

  componentWillMount() {
    this._loadAssets();
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _mounted = false;

  _loadAssets = async () => {
    await loadAssetsAsync();
    if (this._mounted) {
      this.setState({
        loaded: true,
      });
    }
  };

  render() {
    if (this.state.loaded) {
      return Children.only(this.props.children);
    } else {
      return this.props.renderLoading();
    }
  }
}
