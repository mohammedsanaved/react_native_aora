import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-slate-400 w-full h-16 px-4 bg-black-100 rounded-2xl items-center focus:bg-primary flex-row">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#8d99ae"}
          className={"flex-1 font-psemibold text-white"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className={"w-6 h-6"}
              resizeMode="contain "
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
