
import { useState } from 'react';
import { AccessRequest } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Check, X } from 'lucide-react';

interface AccessRequestItemProps {
  request: AccessRequest;
  isAdmin?: boolean;
  onApprove?: (request: AccessRequest, comments: string) => void;
  onReject?: (request: AccessRequest, comments: string) => void;
}

const AccessRequestItem = ({ 
  request, 
  isAdmin = false,
  onApprove,
  onReject
}: AccessRequestItemProps) => {
  const [comments, setComments] = useState('');
  
  const getStatusBadge = (status: string) => {
    const statuses: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
    };
    
    return statuses[status] || 'bg-gray-100 text-gray-800';
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            {request.report?.name || 'Relatório não disponível'}
          </CardTitle>
          <Badge className={getStatusBadge(request.status)}>
            {request.status === 'pending' ? 'Pendente' : 
             request.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
          </Badge>
        </div>
        <CardDescription>
          Solicitado em: {formatDate(request.requestedAt)}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Justificativa</h4>
            <p className="mt-1">{request.justification}</p>
          </div>
          
          {request.reviewedAt && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Revisado em</h4>
              <p className="mt-1">{formatDate(request.reviewedAt)}</p>
            </div>
          )}
          
          {request.reviewerComments && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Comentários do revisor</h4>
              <p className="mt-1">{request.reviewerComments}</p>
            </div>
          )}
          
          {isAdmin && request.status === 'pending' && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Adicionar comentários</h4>
              <Textarea 
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Comentários opcionais para o solicitante"
                className="mt-1"
              />
            </div>
          )}
        </div>
      </CardContent>
      
      {isAdmin && request.status === 'pending' && (
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            className="border-red-200 hover:bg-red-50 text-red-600"
            onClick={() => onReject?.(request, comments)}
          >
            <X className="mr-2 h-4 w-4" />
            Rejeitar
          </Button>
          <Button 
            variant="outline" 
            className="border-green-200 hover:bg-green-50 text-green-600"
            onClick={() => onApprove?.(request, comments)}
          >
            <Check className="mr-2 h-4 w-4" />
            Aprovar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccessRequestItem;
