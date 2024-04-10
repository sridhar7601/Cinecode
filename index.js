import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Font } from 'react-native';

// // Register custom font
// Font.register({
//   family: 'CarmenSans',
//   fonts: [
//     { src: require('./src/assets/fonts/CarmenSansBold.otf'), fontWeight: 'normal' },
//     // Add more font weights/styles if needed
//   ],
// });

// Register the main component with AppRegistry
AppRegistry.registerComponent(appName, () => App);
