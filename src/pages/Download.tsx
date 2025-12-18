import { Helmet } from "react-helmet-async";
import { Download, Smartphone, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import uniplugLogo from "@/assets/uniplug-logo.png";

const DownloadPage = () => {
  // Replace these with your actual WebToNative download links
  const IOS_DOWNLOAD_LINK = "#";
  const ANDROID_DOWNLOAD_LINK = "#";

  return (
    <>
      <Helmet>
        <title>Download Uniplug App | iOS & Android</title>
        <meta name="description" content="Download the Uniplug app for iOS or Android. Shop and sell on campus with ease." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 py-16">
          <div className="container px-4">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <img 
                src={uniplugLogo} 
                alt="Uniplug" 
                className="h-20 w-auto mx-auto mb-6" 
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get the Uniplug App
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Download our mobile app for a better shopping and selling experience on campus. 
                Available for iOS and Android devices.
              </p>
            </div>

            {/* Download Options */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
              {/* iOS Download */}
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Apple className="h-10 w-10 text-background" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">iOS</h2>
                  <p className="text-muted-foreground mb-6">
                    For iPhone and iPad devices running iOS 12 or later
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-foreground hover:bg-foreground/90"
                  >
                    <a href={IOS_DOWNLOAD_LINK} download>
                      <Download className="mr-2 h-5 w-5" />
                      Download for iOS
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Android Download */}
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Android</h2>
                  <p className="text-muted-foreground mb-6">
                    For Android devices running Android 8.0 or later
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <a href={ANDROID_DOWNLOAD_LINK} download>
                      <Download className="mr-2 h-5 w-5" />
                      Download for Android
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Installation Instructions */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Installation Instructions</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* iOS Instructions */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    iOS Installation
                  </h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">1.</span>
                      Tap the download button above
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">2.</span>
                      When prompted, tap "Install"
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">3.</span>
                      Go to Settings → General → VPN & Device Management
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">4.</span>
                      Trust the developer certificate
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">5.</span>
                      Open the app and start shopping!
                    </li>
                  </ol>
                </div>

                {/* Android Instructions */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Android Installation
                  </h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">1.</span>
                      Tap the download button above
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">2.</span>
                      Enable "Install from unknown sources" if prompted
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">3.</span>
                      Open the downloaded APK file
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">4.</span>
                      Tap "Install" when prompted
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground">5.</span>
                      Open the app and start shopping!
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-8">Why Download the App?</h2>
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold mb-2">Faster Experience</h3>
                  <p className="text-sm text-muted-foreground">Native performance for seamless browsing</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <h3 className="font-semibold mb-2">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Never miss an order or message</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-semibold mb-2">Easy Access</h3>
                  <p className="text-sm text-muted-foreground">Launch directly from your home screen</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DownloadPage;
