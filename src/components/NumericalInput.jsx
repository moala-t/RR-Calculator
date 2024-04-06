import { View, TextInput, Platform, Keyboard } from "react-native";
import React from "react";

const NumericInput = ({
  onChange,
  placeholder,
  value = "",
  parentClassName = "",
  float = true,
}) => {
  const handleNumberChange = (text) => {
    // Remove any non-numeric characters using a regular expression
    const numericValue = float
      ? text.replace(/[^0-9.]/g, "")
      : text.replace(/[^0-9]/g, "");
    onChange(numericValue);
  };

  return (
    <View
      className={
        parentClassName
          ? parentClassName
          : "w-full p-2 bg-white rounded-md flex justify-center"
      }
    >
      <TextInput
        className="w-ful"
        style={
          Platform.OS === "web"
            ? { outlineWidth: 0, outlineColor: "transparent" }
            : {}
        }
        placeholderTextColor="#CCCCCC"
        placeholder={placeholder}
        onChangeText={handleNumberChange}
        value={value?.toString()}
        keyboardType="numeric" // Set keyboardType to 'numeric'
        returnKeyType="done" // Set the returnKeyType to "done"
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
};

export default NumericInput;
