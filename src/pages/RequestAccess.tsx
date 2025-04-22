import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Report, AccessRequest } from '@/types';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RequestAccessForm from '@/components/access/RequestAccessForm';
import AccessRequestItem from '@/components/access/AccessRequestItem';

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Relatório de Produção Diária',
    description: 'Visualize os dados de produção diária da planta.',
    category: 'Produção',
    urlPath: '/reports/production-daily',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Dashboard de Qualidade',
    description: 'Análise de indicadores de qualidade e rejeitos.',
    category: 'Produção',
    urlPath: '/reports/quality',
    isActive: true,
    createdAt: '2023-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Gestão de Estoque',
    description: 'Controle de estoque de matéria-prima e produtos.',
    category: 'Logística',
    urlPath: '/reports/inventory',
    isActive: true,
    createdAt: '2023-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Análise Financeira',
    description: 'Relatórios financeiros e análise de custos.',
    category: 'Financeiro',
    urlPath: '/reports/financial',
    isActive: true,
    createdAt: '2023-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Gestão de Recursos Humanos',
    description: 'Informações sobre colaboradores e produtividade.',
    category: 'RH',
    urlPath: '/reports/hr',
    isActive: true,
    createdAt: '2023-01-05T00:00:00.000Z',
  },
  {
    id: '6',
    name: 'Manutenção Preventiva',
    description: 'Calendário de manutenção e histórico de ocorrências.',
    category: 'Operacional',
    urlPath: '/reports/maintenance',
    isActive: true,
    createdAt: '2023-01-06T00:00:00.000Z',
  },
  {
    id: '7',
    name: 'Análise de Performance',
    description: 'Métricas de performance das linhas de produção.',
    category: 'Produção',
    urlPath: '/reports/performance',
    isActive: true,
    createdAt: '2023-01-07T00:00:00.000Z',
  },
  {
    id: '8',
    name: 'Relatório de Vendas',
    description: 'Análise detalhada de vendas e faturamento.',
    category: 'Financeiro',
    urlPath: '/reports/sales',
    isActive: true,
    createdAt: '2023-01-08T00:00:00.000Z',
  },
];

// Mock user reports (IDs that the user already has access to)
const mockUserReports = ['1', '3', '5'];

// Mock access requests
const initialMockRequests: AccessRequest[] = [
  {
    id: '1',
    userId: '1',
    reportId: '2',
    justification: 'Preciso acompanhar os indicadores de qualidade diariamente para minha função.',
    status: 'pending',
    requestedAt: '2023-04-15T10:30:00.000Z',
    report: mockReports.find(r => r.id === '2'),
  },
  {
    id: '2',
    userId: '1',
    reportId: '4',
    justification: 'Necessário para análise de custos do meu departamento.',
    status: 'approved',
    requestedAt: '2023-04-10T14:22:00.000Z',
    reviewedAt: '2023-04-11T09:15:00.000Z',
    reviewedBy: '2',
    reviewerComments: 'Aprovado conforme solicitado.',
    report: mockReports.find(r => r.id === '4'),
  },
  {
    id: '3',
    userId: '1',
    reportId: '7',
    justification: 'Preciso analisar a performance da linha 3.',
    status: 'rejected',
    requestedAt: '2023-04-05T16:45:00.000Z',
    reviewedAt: '2023-04-06T11:30:00.000Z',
    reviewedBy: '2',
    reviewerComments: 'Acesso negado por restrições de confidencialidade.',
    report: mockReports.find(r => r.id === '7'),
  },
];

const RequestAccess = () => {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(initialMockRequests);
  const { toast } = useToast();

  const handleSubmitRequest = (
    requestData: Omit<AccessRequest, 'id' | 'userId' | 'requestedAt' | 'status'>
  ) => {
    const newRequest: AccessRequest = {
      id: `${accessRequests.length + 1}`,
      userId: '1',
      reportId: requestData.reportId,
      justification: requestData.justification,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      report: mockReports.find(r => r.id === requestData.reportId),
    };
    setAccessRequests([newRequest, ...accessRequests]);
    toast({
      title: 'Request sent',
      description: 'Your access request has been submitted successfully!',
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Access Requests</h1>
        <p className="text-gray-600 mt-1">
          Request access to new features or view your previous requests
        </p>
      </div>
      <Tabs defaultValue="request">
        <TabsList className="mb-6">
          <TabsTrigger value="request">New Request</TabsTrigger>
          <TabsTrigger value="history">Request History</TabsTrigger>
        </TabsList>
        <TabsContent value="request" className="space-y-6">
          <RequestAccessForm
            reports={mockReports}
            userReports={mockUserReports}
            onSubmit={handleSubmitRequest}
          />
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Features you already have access to</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockReports
                .filter(report => mockUserReports.includes(report.id))
                .map(report => (
                  <div
                    key={report.id}
                    className="p-4 border rounded-md bg-gray-50"
                  >
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your requests</h3>
            <Separator />
            {accessRequests.length > 0 ? (
              <div>
                {accessRequests.map(request => (
                  <AccessRequestItem key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't made any access requests yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RequestAccess;
