import { Target, Users, Leaf, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower communities to combat illegal dumping and promote sustainable waste management practices for a cleaner, healthier environment.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Your reports and participation help authorities take swift action against environmental violations and protect our shared spaces.'
  },
  {
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'Every report contributes to reducing pollution, protecting wildlife, and preserving natural resources for future generations.'
  },
  {
    icon: Award,
    title: 'Making a Difference',
    description: 'Join thousands of eco-conscious citizens working together to create positive change in their local communities.'
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-foreground">About EcoReport</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering communities to protect the environment through action and awareness
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="shadow-soft hover:shadow-medium transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{stat.title}</h3>
                    <p className="text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-medium bg-gradient-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">Spot & Report</h4>
                  <p className="text-muted-foreground text-sm">
                    See illegal dumping? Report it with location, photos, and details through our easy form.
                  </p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">We Take Action</h4>
                  <p className="text-muted-foreground text-sm">
                    Your report is immediately forwarded to local authorities for investigation and cleanup.
                  </p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">Learn & Prevent</h4>
                  <p className="text-muted-foreground text-sm">
                    Access recycling resources and learn how to reduce waste in your own community.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
