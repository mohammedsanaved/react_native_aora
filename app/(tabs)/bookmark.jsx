import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { icons } from "../../constants";

const Bookmark = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] ?? []}
        data={[]}
        // data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item?.thumbnail}
            video={item?.video}
            username={item?.creator?.username}
            avatar={item?.creator?.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-gray-200 text-2xl">
                  Saved Posts
                </Text>
                {/* <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text> */}
              </View>
              <View>
                <Image
                  source={icons.bookmark}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor={"#FF9C01"}
                />
              </View>
            </View>
            <SearchInput placeholder={"Search for Videos"} />
            {/* <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending
                // posts={[]}
                posts={latestPost ?? []}
              />
            </View> */}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video Found"
            subtitle="No Posts are Saved Yet!!"
          />
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
