
import { Report } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  report: Report;
  onOpen: (report: Report) => void;
}

const FeatureCard = ({ report, onOpen }: FeatureCardProps) => {
  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      'Financeiro': 'bg-green-100 text-green-800',
      'Operacional': 'bg-blue-100 text-blue-800',
      'Logística': 'bg-yellow-100 text-yellow-800',
      'RH': 'bg-purple-100 text-purple-800',
      'Produção': 'bg-red-100 text-red-800',
    };
    
    return categories[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="feature-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{report.name}</CardTitle>
          <Badge className={getCategoryColor(report.category)}>
            {report.category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{report.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-24 bg-mcqueen-50 rounded-md flex items-center justify-center mb-4">
          <span className="text-mcqueen-500 text-sm">Prévia do relatório</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant="default"
          onClick={() => onOpen(report)}
        >
          Acessar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
