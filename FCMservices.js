import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native'
const backgroundMessageService = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}
const foregroundMessageService = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Message handled in the foreground!', remoteMessage);
    Alert.alert('Bạn có thông báo mới', [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
    );
  });
}

const backgroundOpenedAppService = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
}
const quitOpenedAppService = () => {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}

export { backgroundMessageService, foregroundMessageService, backgroundOpenedAppService }