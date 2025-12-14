import { UserPlus, Store, Package, CreditCard } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account in seconds using your campus email",
    step: "01"
  },
  {
    icon: Store,
    title: "Create Your Store",
    description: "Set up your store, add products or services, and start selling",
    step: "02"
  },
  {
    icon: Package,
    title: "List & Sell",
    description: "Upload your products with prices and delivery options",
    step: "03"
  },
  {
    icon: CreditCard,
    title: "Get Paid",
    description: "Receive payments securely and grow your campus business",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Start in 4 Simple Steps
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're looking to sell or buy, getting started is quick and easy
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              {/* Step Number */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {step.step}
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-accent mb-6 group-hover:shadow-glow transition-all duration-300">
                <step.icon className="h-10 w-10 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
