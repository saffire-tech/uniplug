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
        
        <main className="flex-1 pt-24 pb-12 md:py-16">
          <div className="container px-4">
            {/* Hero Section */}
            <div className="text-center mb-10 md:mb-16">
              <img 
                src={uniplugLogo} 
                alt="Uniplug" 
                className="h-16 md:h-20 w-auto mx-auto mb-4 md:mb-6" 
              />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                Get the Uniplug App
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                Download our mobile app for a better shopping and selling experience on campus. 
                Available for iOS and Android devices.
              </p>
            </div>

            {/* Download Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-3xl mx-auto mb-10 md:mb-16">
              {/* iOS Download */}
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Apple className="h-8 w-8 md:h-10 md:w-10 text-background" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">iOS</h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    For iPhone and iPad devices running iOS 12 or later
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-foreground hover:bg-foreground/90 h-12 md:h-11"
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
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Smartphone className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Android</h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    For Android devices running Android 8.0 or later
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 h-12 md:h-11"
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
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Installation Instructions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* iOS Instructions */}
                <div className="bg-muted/50 rounded-xl p-5 md:p-6">
                  <h3 className="font-semibold mb-3 md:mb-4 flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    iOS Installation
                  </h3>
                  <ol className="space-y-2.5 md:space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">1.</span>
                      <span>Tap the download button above</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">2.</span>
                      <span>When prompted, tap "Install"</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">3.</span>
                      <span>Go to Settings → General → VPN & Device Management</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">4.</span>
                      <span>Trust the developer certificate</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">5.</span>
                      <span>Open the app and start shopping!</span>
                    </li>
                  </ol>
                </div>

                {/* Android Instructions */}
                <div className="bg-muted/50 rounded-xl p-5 md:p-6">
                  <h3 className="font-semibold mb-3 md:mb-4 flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Android Installation
                  </h3>
                  <ol className="space-y-2.5 md:space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">1.</span>
                      <span>Tap the download button above</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">2.</span>
                      <span>Enable "Install from unknown sources" if prompted</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">3.</span>
                      <span>Open the downloaded APK file</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">4.</span>
                      <span>Tap "Install" when prompted</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-foreground min-w-[20px]">5.</span>
                      <span>Open the app and start shopping!</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-10 md:mt-16 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Why Download the App?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                <div className="p-4 md:p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold mb-1 md:mb-2">Faster Experience</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Native performance for seamless browsing</p>
                </div>
                <div className="p-4 md:p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <h3 className="font-semibold mb-1 md:mb-2">Push Notifications</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Never miss an order or message</p>
                </div>
                <div className="p-4 md:p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-semibold mb-1 md:mb-2">Easy Access</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Launch directly from your home screen</p>
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
