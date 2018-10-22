import { AppRegistry } from 'react-native';
import App from './src/App2';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Setting a timer for a long periode of time', 'Module RCTImageLoader']);

AppRegistry.registerComponent('FSTMaps', () => App);
