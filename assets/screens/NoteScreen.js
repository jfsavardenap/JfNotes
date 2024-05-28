import { Text, SafeAreaView } from "react-native";
import { useEffect } from "react";
import tw from "twrnc";

function NoteScreen() {
  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <SafeAreaView>
      <Text>This is a note</Text>
    </SafeAreaView>
  );
}

export default NoteScreen;
