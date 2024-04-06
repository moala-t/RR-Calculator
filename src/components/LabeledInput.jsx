import { View, Text } from "react-native";
import React from "react";

export default function LabeledInput({
  label,
  children,
  extraParentClassName,
  extraTextClassName,
}) {
  return (
    <View
      className={"flex-col w-full " + extraParentClassName}
      style={{ rowGap: 1 }}
    >
      <Text className={" " + extraTextClassName}>{label}</Text>
      {children}
    </View>
  );
}
