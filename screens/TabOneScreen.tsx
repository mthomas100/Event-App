import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import tw from 'twrnc';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<Text style={tw`text-xl font-bold`}>Tab One</Text>
			<View style={tw`my-8 h-1 w-9/12`} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<EditScreenInfo path="/screens/TabOneScreen.tsx" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
