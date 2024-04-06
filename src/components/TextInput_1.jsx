import { View, Text, TextInput, StyleSheet, Platform, Keyboard } from "react-native";

const TextInput_1 = ({label, onChangeText, placeholder, value=""}) => {
  return (
    <View className="flex-col w-full" style={{rowGap:1}}>
        <Text>{label}</Text>
        <View className="w-full p-2 bg-white rounded-md">
          <TextInput
            style={
              Platform.OS === "web"
                ? { outlineWidth: 0, outlineColor: "transparent" }
                : {}
            }
            placeholderTextColor="#CCCCCC"
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            returnKeyType="done" // Set the returnKeyType to "done"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
    </View>
  );
};

export default TextInput_1;
