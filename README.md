# Customizable React Toaster

A fully customizable, production-ready React toaster component designed with modern UX principles. This toaster system provides a clean API, smooth animations, and a professional design that integrates easily into your React applications.

## Features

✨ **Complete Customization**:
- Custom colors, fonts, sizes, and gradients.
- Full control over the appearance and behavior of toasts.

📍 **6 Position Options**:
- Display toasts at **top-left**, **top-right**, **top-center**, **bottom-left**, **bottom-right**, and **bottom-center**.

🎭 **Multiple Animation Types**:
- Choose between **fade**, **slide**, **zoom**, and **bounce** animations for your toasts.

📊 **Progress Bar**:
- Customizable progress bar that fills based on the toast duration.

🎯 **Toast Types**:
- 5 different toast types: **default**, **success**, **error**, **warning**, **info**.

🌈 **Gradient Backgrounds**:
- Add vibrant gradient backgrounds to your toasts.

🎨 **Custom Styling**:
- Fully customizable styles, including background color, text color, padding, border radius, and more.

📱 **Fully Responsive**:
- Ensures your toasts look great on any screen size.

🌓 **Dark Mode Support**:
- Automatic support for dark mode, making your toasts compatible with modern design themes.

## Installation

You can install this package via npm or yarn:

```bash
npm install customizable-react-toaster
```

```bash
yarn add customizable-react-toaster
```

## Usage

Import the ToasterProvider and useToaster hook in your application.

## Example Usage
Step 1: Wrap your application with the ToasterProvider

```base
import { ToasterProvider } from 'customizable-react-toaster';

function App() {
  return (
    <ToasterProvider>
      <YourAppComponents />
    </ToasterProvider>
  );
}

```
Step 2: Use the useToaster hook to trigger toasts

```base
import { useToaster } from 'customizable-react-toaster';

function YourComponent() {
  const { addToast } = useToaster();

  const showToast = () => {
    addToast({
      message: "Your custom toast message",
      type: "success",         // or "error", "warning", "info", "default"
      position: "top-right",   // or "top-left", "bottom-right", etc.
      animation: "fade",       // or "slide", "zoom", "bounce"
      duration: 5000,          // Time in milliseconds
      progressBar: true,       // Show progress bar
      gradient: ["#FF5733", "#C70039"],  // Optional gradient background
    });
  };

  return (
    <button onClick={showToast}>Show Toast</button>
  );
}

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
| -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------  |----------------------- |

## Position Options

top-left

top-center

top-right

bottom-left

bottom-center

bottom-right

## Animation Options

fade

slide

zoom

bounce

## Full Example

Here is an example of using the toaster with custom settings:
```base
import { useToaster } from 'customizable-react-toaster';

function ExampleComponent() {
  const { addToast } = useToaster();

  const triggerCustomToast = () => {
    addToast({
      message: 'Operation completed successfully!',
      type: 'success',
      position: 'bottom-left',
      animation: 'bounce',
      duration: 5000,
      progressBar: true,
      gradient: ['#00b4d8', '#90e0ef'],
      customStyles: {
        backgroundColor: '#00b4d8',
        textColor: '#ffffff',
        width: '350px',
        borderRadius: '12px',
        padding: '16px',
      },
    });
  };

  return (
    <div>
      <button onClick={triggerCustomToast}>Show Success Toast</button>
    </div>
  );
}

```


##  Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request. You can also open issues for bugs or feature requests.

## License

MIT License. See LICENSE for more details.


---

### Key Points of the README:

- **Features**: Lists all features and customization options available for the toaster.
- **Installation**: Instructions for installing the package using npm or yarn.
- **Usage**: Provides code examples for how to use the toaster in a React app.
- **Configuration**: Detailed breakdown of configurable properties like message, position, type, animation, custom styles, etc.
- **Quick Demo**: Example buttons to quickly display different types of toasts.
- **Customization**: Explains how to customize aspects like background color, text color, gradient, 3D effects, and more.
- **Contributing & License**: Guidelines for contributing and the licensing details.

This should give users a comprehensive understanding of how to use and customize your toaster component!

