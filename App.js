import { SafeAreaView, Text, Image, Button } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 

function App() {
  useDeviceContext(tw);

const CustomText = ({title, color}) => {
    return (
    <Text style={tw`text-${color}-800 text-4xl`}>
     {title}
    </Text>
    )
  }

  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text style={tw`w-screen mt-16 text-center text-xl text-blue-700`}>
          JF was here!
        </Text>
        <Image style={[tw`mx-auto mt-2 w-46 h-46 rounded-xl`]} source={{uri:"https://bit.ly/3Ta2Cf8"}} />
        <Button title={"Click here!"} onPress={() => {console.log("Button was pressed!")}} />
        <CustomText title = "Yo man yo" color="blue" />
        <CustomText title = "Yo man yo" color= "red" />
      </SafeAreaView>
    </Provider>
  )
}

export default App;
