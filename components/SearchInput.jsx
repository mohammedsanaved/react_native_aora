import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ placeholder, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-slate-400 w-full h-16 px-4 bg-black-100 rounded-2xl items-center focus:bg-primary flex-row space-x-4">
      <TextInput
        value={query}
        placeholder={placeholder}
        placeholderTextColor={"#8d99ae"}
        className={"flex-1 text-white mt-0.5 font-pregular"}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input someThing to search results across the data"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
