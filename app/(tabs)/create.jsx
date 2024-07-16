import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const [uploading, setUploading] = useState(false);
  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      Alert.alert("Document picked", JSON.stringify(result, 2));
    }
  };
  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-gray-100 font-psemibold">
          Upload Video
        </Text>
        <FormField
          title={"Video Title"}
          otherStyles={"mt-10"}
          placeholder={"Give the Video title here"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                className="w-full h-64 rounded-2xl"
                source={{ uri: form.video.uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center bg-black-100">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-psemibold">
            thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                className="w-full h-8 rounded-2xl"
                source={{ uri: form.video.uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 flex-row rounded-2xl justify-center items-center border-2 border-black-200 space-x-2">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="font-pmedium text-sm text-gray-100">
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title={"Prompt"}
          otherStyles={"mt-7"}
          placeholder={"Give the Video prompt here"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
        />
        <CustomButton
          title={"Submit & Publish"}
          containerStyles={"mt-7"}
          handlePress={submit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
