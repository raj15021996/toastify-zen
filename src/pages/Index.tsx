import { useState } from 'react';
import { useToaster, ToastPosition, ToastAnimation, ToastType } from '@/contexts/ToasterContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Package, Code2, Palette } from 'lucide-react';

const Index = () => {
  const { addToast } = useToaster();
  
  // Configuration state
  const [message, setMessage] = useState('Your notification message here!');
  const [type, setType] = useState<ToastType>('default');
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [animation, setAnimation] = useState<ToastAnimation>('slide');
  const [duration, setDuration] = useState(3000);
  const [progressBar, setProgressBar] = useState(true);
  const [useGradient, setUseGradient] = useState(false);
  const [gradientStart, setGradientStart] = useState('#6366f1');
  const [gradientEnd, setGradientEnd] = useState('#8b5cf6');
  const [useCustomStyles, setUseCustomStyles] = useState(false);
  const [customBg, setCustomBg] = useState('#ffffff');
  const [customText, setCustomText] = useState('#000000');
  const [customWidth, setCustomWidth] = useState('400px');
  const [customHeight, setCustomHeight] = useState('auto');
  const [customBorderRadius, setCustomBorderRadius] = useState('8px');
  const [customPadding, setCustomPadding] = useState('16px');
  const [enable3D, setEnable3D] = useState(false);

  const showToast = () => {
    addToast({
      message,
      type,
      position,
      animation,
      duration,
      progressBar,
      gradient: useGradient ? [gradientStart, gradientEnd] : undefined,
      customStyles: useCustomStyles || enable3D ? {
        backgroundColor: useCustomStyles ? customBg : undefined,
        textColor: useCustomStyles ? customText : undefined,
        width: customWidth,
        height: customHeight,
        borderRadius: customBorderRadius,
        padding: customPadding,
        boxShadow: enable3D ? '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : undefined,
        border: enable3D ? '1px solid rgba(255, 255, 255, 0.1)' : undefined,
      } : undefined,
    });
  };

  const showQuickDemo = (demoType: ToastType) => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred. Please try again.',
      warning: 'Warning: This action cannot be undone.',
      info: 'Did you know? This toaster is fully customizable!',
      default: 'This is a default notification.',
    };
    
    addToast({
      message: messages[demoType],
      type: demoType,
      position: 'top-right',
      animation: 'slide',
      duration: 3000,
      progressBar: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Customizable React Toaster</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Beautiful Notifications
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A fully customizable React toaster component with animations, gradients, and complete control over styling
          </p>
        </div>

        {/* Quick Demo Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button onClick={() => showQuickDemo('success')} variant="outline" className="gap-2">
            Success Toast
          </Button>
          <Button onClick={() => showQuickDemo('error')} variant="outline" className="gap-2">
            Error Toast
          </Button>
          <Button onClick={() => showQuickDemo('warning')} variant="outline" className="gap-2">
            Warning Toast
          </Button>
          <Button onClick={() => showQuickDemo('info')} variant="outline" className="gap-2">
            Info Toast
          </Button>
          <Button onClick={() => showQuickDemo('default')} variant="outline" className="gap-2">
            Default Toast
          </Button>
        </div>

        {/* Main Configuration Card */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Customize Your Toast
              </CardTitle>
              <CardDescription>
                Configure all aspects of your notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your notification message"
                  rows={3}
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Toast Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as ToastType)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={(v) => setPosition(v as ToastPosition)}>
                  <SelectTrigger id="position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-center">Top Center</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-center">Bottom Center</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Animation */}
              <div className="space-y-2">
                <Label htmlFor="animation">Animation</Label>
                <Select value={animation} onValueChange={(v) => setAnimation(v as ToastAnimation)}>
                  <SelectTrigger id="animation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (ms)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={1000}
                  max={10000}
                  step={500}
                />
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-between">
                <Label htmlFor="progressBar">Show Progress Bar</Label>
                <Switch
                  id="progressBar"
                  checked={progressBar}
                  onCheckedChange={setProgressBar}
                />
              </div>

              <Separator />

              {/* Gradient Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="useGradient">Use Gradient Background</Label>
                  <Switch
                    id="useGradient"
                    checked={useGradient}
                    onCheckedChange={setUseGradient}
                  />
                </div>
                
                {useGradient && (
                  <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <Label htmlFor="gradientStart">Start Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="gradientStart"
                          type="color"
                          value={gradientStart}
                          onChange={(e) => setGradientStart(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={gradientStart}
                          onChange={(e) => setGradientStart(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gradientEnd">End Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="gradientEnd"
                          type="color"
                          value={gradientEnd}
                          onChange={(e) => setGradientEnd(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={gradientEnd}
                          onChange={(e) => setGradientEnd(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Custom Styles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="useCustomStyles">Custom Colors</Label>
                  <Switch
                    id="useCustomStyles"
                    checked={useCustomStyles}
                    onCheckedChange={setUseCustomStyles}
                  />
                </div>
                
                {useCustomStyles && (
                  <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <Label htmlFor="customBg">Background</Label>
                      <div className="flex gap-2">
                        <Input
                          id="customBg"
                          type="color"
                          value={customBg}
                          onChange={(e) => setCustomBg(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={customBg}
                          onChange={(e) => setCustomBg(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customText">Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="customText"
                          type="color"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Dimensions & Spacing */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Dimensions & Spacing</Label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customWidth">Width</Label>
                    <Input
                      id="customWidth"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      placeholder="e.g., 400px, 100%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customHeight">Height</Label>
                    <Input
                      id="customHeight"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      placeholder="e.g., auto, 100px"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customBorderRadius">Border Radius</Label>
                    <Input
                      id="customBorderRadius"
                      value={customBorderRadius}
                      onChange={(e) => setCustomBorderRadius(e.target.value)}
                      placeholder="e.g., 8px, 1rem"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customPadding">Padding</Label>
                    <Input
                      id="customPadding"
                      value={customPadding}
                      onChange={(e) => setCustomPadding(e.target.value)}
                      placeholder="e.g., 16px, 1rem"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* 3D Effect */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable3D">3D Effect</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add depth with shadows and perspective
                    </p>
                  </div>
                  <Switch
                    id="enable3D"
                    checked={enable3D}
                    onCheckedChange={setEnable3D}
                  />
                </div>
              </div>

              <Button onClick={showToast} className="w-full" size="lg">
                Show Toast
              </Button>
            </CardContent>
          </Card>

          {/* Code Examples & Features */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Usage Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { useToaster } from '@/contexts/ToasterContext';

const MyComponent = () => {
  const { addToast } = useToaster();

  const showNotification = () => {
    addToast({
      message: "${message}",
      type: "${type}",
      position: "${position}",
      animation: "${animation}",
      duration: ${duration},
      progressBar: ${progressBar},${useGradient ? `\n      gradient: ["${gradientStart}", "${gradientEnd}"],` : ''}
      customStyles: {${useCustomStyles ? `\n        backgroundColor: "${customBg}",\n        textColor: "${customText}",` : ''}
        width: "${customWidth}",
        height: "${customHeight}",
        borderRadius: "${customBorderRadius}",
        padding: "${customPadding}",${enable3D ? `\n        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)",\n        border: "1px solid rgba(255, 255, 255, 0.1)",` : ''}
      },
    });
  };

  return <button onClick={showNotification}>
    Show Toast
  </button>;
};`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>6 Position Options:</strong> top-left, top-right, top-center, bottom-left, bottom-right, bottom-center</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>4 Animation Types:</strong> fade, slide, zoom, bounce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>5 Toast Types:</strong> default, success, error, warning, info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Progress Bar:</strong> Visual countdown indicator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Gradient Support:</strong> Beautiful gradient backgrounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Custom Styles:</strong> Override any visual property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Dimensions:</strong> Width, height, border radius, padding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>3D Effect:</strong> Depth and perspective transforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>TypeScript:</strong> Full type safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span><strong>Dark Mode:</strong> Automatic theme support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
