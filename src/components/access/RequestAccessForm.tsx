
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
        title: 'Erro',
        description: 'Selecione um relatório para solicitar acesso.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!justification) {
      toast({
        title: 'Erro',
        description: 'Por favor, forneça uma justificativa para a solicitação.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare request data
    const requestData = {
      reportId: selectedReportId,
      justification,
    };
    
    // Submit request
    onSubmit(requestData);
    
    // Reset form
    setSelectedReportId(null);
    setJustification('');
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar Acesso a Funcionalidade</CardTitle>
        <CardDescription>
          Selecione um relatório ou funcionalidade para solicitar acesso.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-reports">Buscar funcionalidades</Label>
            <Input
              id="search-reports"
              placeholder="Digite para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Funcionalidades disponíveis para solicitação</Label>
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
                    Nenhuma funcionalidade encontrada ou você já tem acesso a todas as funcionalidades disponíveis.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="justification">Justificativa</Label>
            <Textarea
              id="justification"
              placeholder="Explique por que você precisa de acesso a esta funcionalidade..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!selectedReportId || !justification || isSubmitting}>
            <Plus className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestAccessForm;
