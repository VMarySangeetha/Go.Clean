import { Recycle, Video, FileText, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import recyclingIdeasImg from '@/assets/recycling-ideas.jpg';

const ideas = [
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step guides on proper recycling techniques and creative upcycling projects.',
    resources: [
      { text: 'Plastic bottle crafts', link: 'https://www.youtube.com/results?search_query=plastic+bottle+recycling+crafts' },
      { text: 'Composting basics', link: 'https://www.youtube.com/results?search_query=composting+basics+tutorial' },
      { text: 'E-waste disposal', link: 'https://www.youtube.com/results?search_query=electronic+waste+recycling+guide' }
    ]
  },
  {
    icon: FileText,
    title: 'Recycling Flowcharts',
    description: 'Easy-to-follow flowcharts to help you identify what can and cannot be recycled.',
    resources: [
      { text: 'Household waste sorting', link: 'https://www.youtube.com/results?search_query=household+waste+sorting+guide' },
      { text: 'Material identification', link: 'https://www.youtube.com/results?search_query=recycling+material+identification' },
      { text: 'Collection guidelines', link: 'https://www.youtube.com/results?search_query=recycling+collection+guidelines' }
    ]
  },
  {
    icon: Lightbulb,
    title: 'Quick Home Remedies',
    description: 'Simple solutions for reducing waste and repurposing items at home.',
    resources: [
      { text: 'DIY cleaning products', link: 'https://www.youtube.com/results?search_query=diy+eco+friendly+cleaning+products' },
      { text: 'Food waste reduction', link: 'https://www.youtube.com/results?search_query=reduce+food+waste+at+home' },
      { text: 'Reusable alternatives', link: 'https://www.youtube.com/results?search_query=reusable+alternatives+zero+waste' }
    ]
  }
];

const RecyclingIdeas = () => {
  return (
    <section id="ideas" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Recycle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">Quick Recycling Ideas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn practical tips and creative solutions for reducing waste and recycling better
          </p>
        </div>

        <div className="mb-12">
          <img 
            src={recyclingIdeasImg} 
            alt="Recycling bins and waste sorting" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-medium"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <Card 
              key={index}
              className="shadow-soft hover:shadow-medium transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <idea.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{idea.title}</CardTitle>
                <CardDescription className="text-base">
                  {idea.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {idea.resources.map((resource, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <a 
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent hover:underline transition-colors"
                      >
                        {resource.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecyclingIdeas;
