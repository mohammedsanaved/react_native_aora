import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the Fields");
      return; // Prevent further execution if fields are empty
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      // console.log(result);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <ScrollView>
        <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className={"font-psemibold text-white text-2xl mt-10"}>
            Log In to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType="email-address"
            placeholder={"Enter Email"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-7"}
            placeholder={"Enter Password"}
          />
          <CustomButton
            title={"Sign In"}
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className={"justify-center pt-5 flex-row gap-2 font-pregular"}>
            <Text className="text-gray-200">Don't have an Account</Text>
            <Link className="font-pregular text-secondary" href={"/sign-up"}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
