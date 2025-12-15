import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Users,
      title: "Connect with Travelers",
      description:
        "Find like-minded adventurers who share your travel interests and passion for exploration.",
    },
    {
      icon: MapPin,
      title: "Explore Together",
      description:
        "Discover new destinations with compatible travel buddies and create unforgettable memories.",
    },
    {
      icon: Heart,
      title: "Safe & Trustworthy",
      description:
        "Our verified community ensures safe connections with genuine travelers from around the world.",
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Why Choose Travel Buddy?
          </h2>
          <p className="text-xl text-gray-600">
            Discover the benefits of joining our community of travel enthusiasts
            and find your perfect travel companion.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow border-0 bg-white"
              >
                <CardHeader>
                  <div className="bg-linear-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
