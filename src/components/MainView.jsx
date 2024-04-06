import { Platform, ScrollView, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";

const MainScrollView = ({
  children,
  refreshControl,
  style = {},
  extraScrollHeight=50,
  enableOnAndroid = false,
  contentContainerStyle = {
  },
}) => {
  return (
    <KeyboardAwareScrollView
      style={style}
      // enableAutomaticScroll={Platform.OS === 'ios'}
      extraScrollHeight={extraScrollHeight}
      className="w-full h-full flex-1"
      contentContainerStyle={contentContainerStyle}
      enableOnAndroid={enableOnAndroid}
      refreshControl={refreshControl}
    >
      <View className="w-[100%] flex-column items-center px-2">
        <View className="h-5 w-full"></View>
        {children}
        <View className="h-7 w-full"></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const MainView = ({ children }) => {
  return (
    <View className="w-full h-full flex-1 px-4 py-3 bg-slate-200 justify-center items-center">
      {children}
      <View className="h-3 w-full"></View>
    </View>
  );
};

export { MainView, MainScrollView };
