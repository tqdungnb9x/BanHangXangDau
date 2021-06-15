/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {backgroundMessageService} from './FCMservices'

    backgroundMessageService();

AppRegistry.registerComponent(appName, () => App);
