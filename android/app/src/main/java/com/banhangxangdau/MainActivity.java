package com.banhangxangdau;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BanHangXangDau";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
  // @Override
  // protected List<ReactPackage> getPackages() {
  //   return Arrays.asList(
  //     new MainReactPackage(),
  //     new ReactNativeFirebaseMessagingPackage(),
  //   );
  // }
}
