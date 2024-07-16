import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setIsLoggedIn, setUser } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  console.log(user, "-------------user");

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            username={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Video Created Yet"}
            subtitle={"ShowCase your Art here"}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="flex w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 flex justify-center items-center border border-secondary rounded-xl">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                subtitle={"Posts"}
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title={"1.2k"}
                subtitle={"Views"}
                titleStyles="text-xl"
                containerStyles=""
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
