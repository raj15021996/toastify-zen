Customizable React Toaster

A fully customizable React toaster component with features like custom design, progress bar, animation types, and default CSS management. This package allows users to easily integrate and customize toasters with options like background color, position, size, animation, and much more.

Features

Customizable Design: Set background color, text color, font size, border radius, and other visual properties.

Progress Bar: Show a progress bar that fills according to the duration of the toaster's visibility.

Positioning: Choose the position of the toaster on the screen (top-left, top-right, bottom-left, bottom-right).

Custom Animations: Choose from several animation types such as fade, slide, zoom, and bounce.

Default CSS: Automatically apply default styling if the user does not provide any custom styles.

Custom Length: Control how long the toaster stays on the screen.

Gradient Colors: Easily apply gradient colors to the toaster background.

Extendable: If no custom styles are provided, a clean default design will be applied.

Installation

You can install this package via npm or yarn:

npm install customizable-react-toaster


Or with yarn:

yarn add customizable-react-toaster

Usage

Import the Toaster component and use it in your React app.

Basic Example
import React from 'react';
import { Toaster } from 'customizable-react-toaster';

function App() {
  return (
    <div className="App">
      <Toaster
        message="This is a customizable toaster"
        position="top-right"
        backgroundColor="blue"
        textColor="white"
        fontSize="16px"
        progressBar={true}
        duration={5000}
        animation="fade"
        customStyles={{ borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
        gradient={['#FF5733', '#C70039']}
      />
    </div>
  );
}

export default App;

Props

Here are the available props for the Toaster component:

Prop	Type	Description	Default Value
message	string	The message to be displayed in the toaster.	null
position	string	Position of the toaster on the screen. Options: "top-left", "top-right", "bottom-left", "bottom-right".	"top-right"
backgroundColor	string	Background color of the toaster.	#333
textColor	string	Text color inside the toaster.	#fff
fontSize	string	Font size of the toaster message.	14px
progressBar	boolean	Whether to display a progress bar that fills based on the duration.	false
duration	number	Duration in milliseconds for how long the toaster stays on the screen.	3000
animation	string	Animation effect for the toaster. Options: "fade", "slide", "zoom", "bounce".	"fade"
customStyles	object	Custom CSS styles for the toaster.	null
gradient	array	Array of two colors to apply a gradient background. Example: ['#FF5733', '#C70039'].	null
Example with Default Styles

If you don't provide custom styles or settings, the toaster will use a default style:

<Toaster message="This is a default toaster" />

Customization Example
<Toaster
  message="Your custom message here"
  position="top-right"
  backgroundColor="blue"
  textColor="white"
  fontSize="16px"
  progressBar={true}
  duration={5000}
  animation="slide"
  customStyles={{ borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
  gradient={['#FF5733', '#C70039']}
/>

Custom Styles

You can customize the toaster further by passing the customStyles prop, which accepts a JavaScript object with CSS properties.

<Toaster
  message="Styled toaster"
  customStyles={{
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '12px',
    padding: '10px 20px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)'
  }}
/>

Advanced Animation

You can change the animation type to one of the following options:

"fade" (default)

"slide"

"zoom"

"bounce"

For example, to use a slide-in effect:

<Toaster message="This is a sliding toaster" animation="slide" />

Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request. You can also open issues for bugs or feature requests.

License

MIT License. See LICENSE for more details.

This README file provides comprehensive information on how to install, use, and customize your React toaster component. It also includes a section for contributing and licensing, making it suitable for an open-source npm package.
