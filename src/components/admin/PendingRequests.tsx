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
      title: 'Request approved',
      description: 'The user was notified and now has access to the feature.',
    });
  };

  const handleReject = (request: AccessRequest, comments: string) => {
    onReject(request, comments);
    toast({
      title: 'Request rejected',
      description: 'The user was notified about the rejection.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Access Requests</h2>
        <p className="text-gray-600">Manage user access requests</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-mcqueen-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="pending">
            <h3 className="text-lg font-medium mb-4">Pending Requests</h3>
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
                <p className="text-gray-500">There are no pending requests at the moment.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            <h3 className="text-lg font-medium mb-4">Approved Requests</h3>
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
                <p className="text-gray-500">There are no approved requests to show.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            <h3 className="text-lg font-medium mb-4">Rejected Requests</h3>
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
                <p className="text-gray-500">There are no rejected requests to show.</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PendingRequests;
