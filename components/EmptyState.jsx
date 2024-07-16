import { View, Text, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-gray-200">{title}</Text>
      <Text className="text-2xl font-psemibold text-white">{subtitle}</Text>
      <CustomButton
        title={"Create Videoo"}
        handlePress={() => router.push("/create")}
        containerStyles={"w-full my-5"}
      />
    </View>
  );
};

export default EmptyState;
