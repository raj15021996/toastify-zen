import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useToaster } from "@/contexts/ToasterContext";

const MobileDemo = () => {
  const isMobile = useIsMobile();
  const { addToast } = useToaster();

  const handleTestToast = () => {
    addToast({
      message: isMobile 
        ? "Toast on mobile device!" 
        : "Toast on desktop/tablet device!",
      type: "info",
      position: isMobile ? "bottom-center" : "top-right",
      theme: "colored",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isMobile ? <Smartphone className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
              useIsMobile Hook Demo
            </CardTitle>
            <CardDescription>
              This hook detects if the viewport is mobile (&lt; 768px)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current State Display */}
            <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Current Device Type:</h3>
                <div className={`px-4 py-2 rounded-full font-bold ${
                  isMobile 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {isMobile ? "📱 Mobile" : "🖥️ Desktop/Tablet"}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Breakpoint: 768px
              </p>
            </div>

            {/* Responsive Layout Example */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Info className="h-5 w-5" />
                Responsive Layout Example
              </h3>
              
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <div className="h-20 bg-primary/10 rounded-md flex items-center justify-center">
                      Box 1
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <div className="h-20 bg-primary/10 rounded-md flex items-center justify-center">
                      Box 2
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <div className="h-20 bg-primary/10 rounded-md flex items-center justify-center">
                      Box 3
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {isMobile 
                  ? "On mobile: Single column layout" 
                  : "On desktop/tablet: 3-column grid layout"}
              </p>
            </div>

            {/* Conditional Content */}
            <div className="space-y-4">
              <h3 className="font-semibold">Conditional Content</h3>
              {isMobile ? (
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-900 dark:text-blue-100">
                    This content only appears on mobile devices. Try resizing your browser to see it change!
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-900 dark:text-green-100">
                    This content only appears on desktop/tablet devices. Try resizing your browser to see it change!
                  </p>
                </div>
              )}
            </div>

            {/* Toast Test */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Test Responsive Toast</h3>
              <Button onClick={handleTestToast} className="w-full sm:w-auto">
                Show Device-Specific Toast
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Toast position changes based on device type
              </p>
            </div>

            {/* Code Example */}
            <div className="space-y-2">
              <h3 className="font-semibold">Usage Example:</h3>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
{`import { useIsMobile } from "@/hooks/use-mobile";

const MyComponent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? "flex-col" : "flex-row"}>
      {isMobile ? "Mobile View" : "Desktop View"}
    </div>
  );
};`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Resize your browser window to see the hook in action! The breakpoint is set at 768px.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileDemo;
