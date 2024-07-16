import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          className={"w-full min-h-[80vh] justify-center items-center px-4"}
        >
          <Image
            source={images.logo}
            className={"w-[130px] h-[84px]"}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className={"max-w-[380px] h-[300px] w-[full]"}
            resizeMode="contain"
          />
          <View className={"relative mt-5"}>
            <Text className="text-3xl font-bold text-center text-white">
              Discover the App for Best Experience with
              <Text className={"text-secondary-200"}> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className={"w-[136px] h-[15px] absolute -bottom-2 -right-3"}
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title={"Continue with Email"}
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles={"w-full mt-7"}
          />
          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
