# Customizable React Toaster

A fully customizable React toaster component with features like animations, gradients, 3D effects, dark mode support, and full customization for background colors, text colors, width, height, border radius, and padding. This package allows users to easily integrate and configure notifications in their React applications.

## Features

- **Customizable Design**: Set background color, text color, font size, border radius, and other visual properties.
- **Progress Bar**: Show a progress bar that fills according to the duration of the toaster's visibility.
- **Positioning**: Choose the position of the toaster on the screen (top-left, top-right, bottom-left, bottom-right, and center).
- **Custom Animations**: Choose from several animation types such as fade, slide, zoom, and bounce.
- **Gradient Colors**: Apply gradient backgrounds with customizable start and end colors.
- **Custom Dimensions & Spacing**: Control width, height, padding, and border radius for the toaster.
- **3D Effect**: Add depth to the toaster with box shadows and perspective effects.
- **Dark Mode Support**: Automatically support dark mode when enabled.
- **TypeScript Support**: Full type safety with TypeScript.

## Installation

You can install this package via npm or yarn:

```bash
npm install customizable-react-toaster
```

```bash
yarn add customizable-react-toaster
```

## Usage

Import the Toaster component and use it in your React app.

## Example Usage

```base
import React, { useState } from 'react';
import { useToaster } from 'customizable-react-toaster';

const App = () => {
  const { addToast } = useToaster();
  const [message, setMessage] = useState('Your notification message here!');
  const [type, setType] = useState('default');
  const [position, setPosition] = useState('top-right');
  const [animation, setAnimation] = useState('slide');
  const [duration, setDuration] = useState(3000);
  const [progressBar, setProgressBar] = useState(true);

  const showToast = () => {
    addToast({
      message,
      type,
      position,
      animation,
      duration,
      progressBar,
    });
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
    </div>
  );
};

export default App;

```
 ## Customizable Properties
 
 | Prop           | Type      | Description                                                                                                                                       | Default Value          |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `message`      | `string`  | The message to be displayed in the toaster.                                                                                                       | `'Your message here!'` |
| `type`         | `string`  | Toast type (success, error, warning, info, default).                                                                                              | `'default'`            |
| `position`     | `string`  | Position of the toaster on the screen. Options: `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`, `"top-center"`, `"bottom-center"` | `'top-right'`          |
| `animation`    | `string`  | Toast animation type. Options: `"fade"`, `"slide"`, `"zoom"`, `"bounce"`.                                                                         | `'slide'`              |
| `duration`     | `number`  | Duration for how long the toaster stays on the screen in milliseconds.                                                                            | `3000`                 |
| `progressBar`  | `boolean` | Whether to show a progress bar.                                                                                                                   | `true`                 |
| `gradient`     | `boolean` | Whether to use a gradient background for the toaster.                                                                                             | `false`                |
| `customStyles` | `object`  | Custom styles to apply to the toaster (background color, text color, border-radius, padding, etc.).                                               | `undefined`            |
| `enable3D`     | `boolean` | Add a 3D effect to the toaster with shadow and perspective.                                                                                       | `false`                |

