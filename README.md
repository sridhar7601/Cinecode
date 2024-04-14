# Getting Started

# Project Name

Cinecode a Fancode inspired App
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/projectname.git
2. Navigate into the project directory:

   ```bash
   cd movie-app
3. Install dependencies:(Use either npm or yarn)

   ```bash
   npm install
   #or
   yarn install

 ## Usage

1. Start the Metro bundler:(Use either npm or yarn)

    ```bash
    npm start
   #or
   yarn start

2. Run the application on iOS / Android:(Use either npm or yarn)

    ```bash
    npx react-native run-ios
    #or
    npx react-native run-android


##Folder Structure

movie-app/
├── __tests__/
│   ├── HomePage.test.tsx        # Unit tests for the HomePage component
│   └── App.test.tsx             # Unit tests for the App component
├── assets/
│   ├── background.png           # Background image asset
│   ├── blur-background.png      # Blurred background image asset
│   └── filterlogo/              # Directory containing filter logo images
│       ├── action.png           # Action genre logo
│       ├── featured.png         # Featured genre logo
│       ├── horror.png           # Horror genre logo
│       └── scifi.png            # Sci-Fi genre logo
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── FilterOption.tsx     # Atom component for filtering options
│   │   │   ├── ImageBackground.tsx  # Atom component for image backgrounds
│   │   │   ├── MovieCard.tsx        # Atom component for displaying movie cards
│   │   │   └── YearList.tsx         # Atom component for displaying movie lists by year
│   │   ├── pages/
│   │   │   └── HomePage.tsx         # Component for the main homepage
│   │   └── atoms/
│   │       └── MovieDetailsPage.tsx  # Atom component for displaying movie details
│   ├── navigation/
│   │   └── MainNavigator.tsx         # Navigation component defining the main navigator
│   ├── utils/
│   │   └── genreMapping.ts           # Utility file mapping genre IDs to names
│   ├── App.tsx                       # Main application component
│   └── ...other files                # Other application files
├── node_modules/                     # Node.js modules (dependencies)
├── package.json                      # Project configuration and dependencies
├── App.js                            # Main application entry point (deprecated in favor of App.tsx)
├── babel.config.js                   # Babel configuration file
├── metro.config.js                   # Metro bundler configuration file
└── README.md                         # Project documentation and information

  


