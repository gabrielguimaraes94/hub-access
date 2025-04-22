
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AccessRequest } from '@/types';
import AccessRequestItem from '@/components/access/AccessRequestItem';

interface PendingRequestsProps {
  requests: AccessRequest[];
  onApprove: (request: AccessRequest, comments: string) => void;
  onReject: (request: AccessRequest, comments: string) => void;
}

const PendingRequests = ({ requests, onApprove, onReject }: PendingRequestsProps) => {
  const [activeTab, setActiveTab] = useState('pending');
  const { toast } = useToast();

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');
  const rejectedRequests = requests.filter(req => req.status === 'rejected');

  const handleApprove = (request: AccessRequest, comments: string) => {
    onApprove(request, comments);
    toast({
      title: 'Solicitação aprovada',
      description: 'O usuário foi notificado e agora tem acesso à funcionalidade.',
    });
  };

  const handleReject = (request: AccessRequest, comments: string) => {
    onReject(request, comments);
    toast({
      title: 'Solicitação rejeitada',
      description: 'O usuário foi notificado sobre a rejeição.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Solicitações de Acesso</h2>
        <p className="text-gray-600">Gerencie solicitações de acesso dos usuários</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pendentes
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-mcqueen-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="pending">
            <h3 className="text-lg font-medium mb-4">Solicitações Pendentes</h3>
            <Separator className="mb-4" />
            
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <AccessRequestItem 
                    key={request.id} 
                    request={request} 
                    isAdmin={true}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Não há solicitações pendentes no momento.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            <h3 className="text-lg font-medium mb-4">Solicitações Aprovadas</h3>
            <Separator className="mb-4" />
            
            {approvedRequests.length > 0 ? (
              <div className="space-y-4">
                {approvedRequests.map(request => (
                  <AccessRequestItem 
                    key={request.id} 
                    request={request} 
                    isAdmin={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Não há solicitações aprovadas para exibir.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            <h3 className="text-lg font-medium mb-4">Solicitações Rejeitadas</h3>
            <Separator className="mb-4" />
            
            {rejectedRequests.length > 0 ? (
              <div className="space-y-4">
                {rejectedRequests.map(request => (
                  <AccessRequestItem 
                    key={request.id} 
                    request={request} 
                    isAdmin={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Não há solicitações rejeitadas para exibir.</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PendingRequests;
