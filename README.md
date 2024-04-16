# Getting Started
## Cinecode

Cinecode is a Fancode-inspired App.
### Task requirement Covered
1. Online / offline capturing events & monitored
2. Layout and UI (Error handling while searched all movies not found pending)
3. Default page load state (2012 starting & load movies of the previous year when the user scrolls up and load
movies of next year when the user scrolls down until the current year.)
4. API
5. Genre Filter (Search filter, Multiple Genre filter)
6. Code Quality (Avoided using pre-built component libraries (e.g., Bootstrap, Tailwind, etc.) for
creating UI components)
7. Implemented a search bar that searches for the movie based on the search string
and displays an infinite loading list of movies that matches the search.
8. TypeScript for enhanced type safety and code quality.
9. Test-Cases (Ongoing as I started to learn on the go)

## Table of Contents

- [Prequestise](#prerequisites)
- [Installation](#installation)
- [Windows](#windows)
- [MacOs](#macos)
- [Usage](#usage)
- [Demo](#demo)
- [UI](#ui)
- [Test](#test)
- [License](#license)

## Prerequisites

1. [Node](https://nodejs.org/en): This will be used to set up your project.
2. To test on Android devices, you can either connect a physical device or [Android Studio](https://developer.android.com/studio) to set up an emulator.
3. To test on iOS devices, you'll need a Mac and install [Xcode](https://developer.apple.com/xcode/) to set up an emulator.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sridhar7601/Cinecode.git
2. Navigate into the project directory:

   ```bash
   cd movie-app
3. Install dependencies:(Use either npm or yarn):

   ```bash
   npm install
   #or
   yarn install
4. For macOS / Windows / Linux follow this link for Environment setup (Choose the desired options):
     - [Enivronment Setup](https://reactnative.dev/docs/environment-setup)

 ## Windows

1. Install Android Studio and set up the Android SDK.
2. Add the Android SDK location to your system's PATH environment variable.
3. In the project directory, run the following command to start the Android app:
      ```bash
      npx react-native run-android
## MacOs 

1. Install Xcode from the Mac App Store.
2. In the project directory, navigate to the ios folder and install the CocoaPods dependencies:
3. 
     ```bash
        cd ios
        pod install
        cd ..
4. Run the iOS app:
5. 
    ```bash
    npx react-native run-ios
## Usage

## Android Usage

1. Connect an Android device or start an Android emulator.
2. In the project directory, run the following command to start the Android app:
3. 
    ```bash
    npx react-native run-android
## iOS Usage

1. Make sure you have a Mac with Xcode installed.
2. Connect an iOS device or start an iOS emulator.
3. In the project directory, run the following command to start the iOS app:
4. 
      ```bash
      npx react-native run-ios
## Demo
[Andriod APK](https://drive.google.com/drive/folders/1vRBnRE2mfIsfNiRII1ZCfHoNB69Aav8l?usp=sharing)
Only for testing purpose (Request via Gdrive and I will give access after consideration )
A Demo video with features including search, multiple filters, and load movies with activity loader(all customizable styles no Css framework used only react-native inbuilt packages)

https://github.com/sridhar7601/Cinecode/assets/56919037/7d36fe42-bbdc-474f-a236-e08b34690276

As per the request and user scrolling if the user scrolls up, it has to list old movies(which is not the appropriate use-case but customizable)

### Method - 1
https://github.com/sridhar7601/Cinecode/assets/56919037/babe2dd7-11c2-4ef6-98ca-4ed87f95b1a8
### Method -2 
    ```bash
    <ScrollView
     onScroll={({nativeEvent})=>{
     if(isCloseToTop(nativeEvent)){
    //do something
     }
     if(isCloseToBottom(nativeEvent)){
        //do something
     }
     }}
    >
     ...contents
     </ScrollView>
     isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }
     ifCloseToTop({layoutMeasurement, contentOffset, contentSize}){
        return contentOffset.y == 0;
     }
![reactnative](https://github.com/sridhar7601/Cinecode/assets/56919037/e62e1669-2afa-4109-8d73-3e79f7ffb031)


## UI 
## Inspired from 
1. [Peacock](https://www.figma.com/file/bzLo9Lx3iBcB6VyP7XOeZC/PeacockApp?type=design&mode=design&t=Btju8kDZiqhV0Pjg-1)
2. [Ticket booking](https://dribbble.com/shots/18133523-Movie-Tickets-Mobile-App)
3. And some Brain crushed Ideas 🪄 🚀

## Test

1. Chai(Ongoing)
2. Mocha(Ongoing)
3. Jest(Ongoing)



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
