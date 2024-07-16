import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ title, username, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-[8px]"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="pt-2"
          onPress={() => setBookmark(!bookmark)}
        >
          <Image
            source={icons.bookmark}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor={bookmark ? "#FF9C01" : "#ffffff"}
          />
        </TouchableOpacity>
      </View>
      {play ? (
        // <Text className="text-white">Playing</Text>
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-[25px] mt-3"
            resizeMode="contain"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
