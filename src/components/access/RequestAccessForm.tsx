import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Plus } from 'lucide-react';
import { Report, AccessRequest } from '@/types';

interface RequestAccessFormProps {
  reports: Report[];
  userReports: string[]; // IDs of reports the user already has access to
  onSubmit: (request: Omit<AccessRequest, 'id' | 'userId' | 'requestedAt' | 'status'>) => void;
}

const RequestAccessForm = ({ reports, userReports, onSubmit }: RequestAccessFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [justification, setJustification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const filteredReports = reports.filter((report) => 
    (report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !userReports.includes(report.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReportId) {
      toast({
        title: 'Error',
        description: 'Please select a report to request access.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!justification) {
      toast({
        title: 'Error',
        description: 'Please provide a justification for the request.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const requestData = {
      reportId: selectedReportId,
      justification,
    };
    
    onSubmit(requestData);
    
    setSelectedReportId(null);
    setJustification('');
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Access to Feature</CardTitle>
        <CardDescription>
          Select a report or feature to request access.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-reports">Search features</Label>
            <Input
              id="search-reports"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Features available for request</Label>
            <div className="max-h-64 overflow-y-auto space-y-2 rounded-md border p-2">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedReportId === report.id
                        ? 'bg-mcqueen-50 border border-mcqueen-200'
                        : 'hover:bg-gray-50 border border-gray-100'
                    }`}
                    onClick={() => setSelectedReportId(report.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      {selectedReportId === report.id && (
                        <Check className="h-5 w-5 text-mcqueen-500" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">
                    No features found, or you already have access to all available features.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="justification">Justification</Label>
            <Textarea
              id="justification"
              placeholder="Explain why you need access to this feature..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!selectedReportId || !justification || isSubmitting}>
            <Plus className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestAccessForm;
