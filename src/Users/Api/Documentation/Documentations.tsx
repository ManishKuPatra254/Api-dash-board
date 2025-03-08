import Layout from "@/Layout/Layout";
import { Shield, Box, FileText } from "lucide-react";

export default function Documentations() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-2">
            Getting Started with KAIE API
          </h1>
          <p className="text-muted-foreground">
            Welcome to KAIE API Your Gateway to Seamless Payment Integration!
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-background rounded-lg mb-12">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground">
            KAIE API empowers developers to seamlessly integrate secure and
            efficient payment processing into their applications. Whether a
            mobile app, or a web service, our API provides a robust foundation
            for handling transactions effortlessly.
          </p>
        </div>

        {/* Key Features Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Secure Transactions */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Utilize our secure payment gateway to ensure the safety of your
                users' sensitive data.
              </p>
            </div>

            {/* Flexible Integration */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="mb-4">
                <Box className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Integration</h3>
              <p className="text-sm text-muted-foreground">
                Easily integrate into various platforms with our flexible API
                endpoints.
              </p>
            </div>

            {/* Comprehensive Documentation */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">
                Comprehensive Documentation
              </h3>
              <p className="text-sm text-muted-foreground">
                Our extensive documentation provides in-depth guidance for
                developers at every step.
              </p>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Get Started</h2>
          {/* Add your getting started content here */}
        </div>
      </div>
    </Layout>
  );
}
