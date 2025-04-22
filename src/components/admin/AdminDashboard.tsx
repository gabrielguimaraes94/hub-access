
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccessRequest } from '@/types';
import PendingRequests from './PendingRequests';
import UserManagement from './UserManagement';

// Mock access requests for development
const mockRequests: AccessRequest[] = [
  {
    id: '1',
    userId: '2',
    reportId: '2',
    justification: 'Preciso acompanhar os indicadores de qualidade diariamente para minha função.',
    status: 'pending',
    requestedAt: '2023-04-15T10:30:00.000Z',
    user: {
      id: '2',
      username: 'joao.silva',
      email: 'joao.silva@mcqueen.com',
      fullName: 'João Silva',
      isAdmin: false,
      lastLogin: '2023-04-19T14:30:00.000Z',
      createdAt: '2023-01-15T00:00:00.000Z',
    },
    report: {
      id: '2',
      name: 'Dashboard de Qualidade',
      description: 'Análise de indicadores de qualidade e rejeitos.',
      category: 'Produção',
      urlPath: '/reports/quality',
      isActive: true,
      createdAt: '2023-01-02T00:00:00.000Z',
    },
  },
  {
    id: '2',
    userId: '3',
    reportId: '4',
    justification: 'Necessário para análise de custos do meu departamento.',
    status: 'pending',
    requestedAt: '2023-04-16T14:22:00.000Z',
    user: {
      id: '3',
      username: 'maria.santos',
      email: 'maria.santos@mcqueen.com',
      fullName: 'Maria Santos',
      isAdmin: false,
      lastLogin: '2023-04-20T09:45:00.000Z',
      createdAt: '2023-02-01T00:00:00.000Z',
    },
    report: {
      id: '4',
      name: 'Análise Financeira',
      description: 'Relatórios financeiros e análise de custos.',
      category: 'Financeiro',
      urlPath: '/reports/financial',
      isActive: true,
      createdAt: '2023-01-04T00:00:00.000Z',
    },
  },
  {
    id: '3',
    userId: '4',
    reportId: '6',
    justification: 'Preciso visualizar o calendário de manutenção para coordenar atividades.',
    status: 'approved',
    requestedAt: '2023-04-12T09:15:00.000Z',
    reviewedAt: '2023-04-13T11:30:00.000Z',
    reviewedBy: '1',
    reviewerComments: 'Aprovado conforme solicitado.',
    user: {
      id: '4',
      username: 'pedro.oliveira',
      email: 'pedro.oliveira@mcqueen.com',
      fullName: 'Pedro Oliveira',
      isAdmin: false,
      lastLogin: '2023-04-18T11:20:00.000Z',
      createdAt: '2023-02-15T00:00:00.000Z',
    },
    report: {
      id: '6',
      name: 'Manutenção Preventiva',
      description: 'Calendário de manutenção e histórico de ocorrências.',
      category: 'Operacional',
      urlPath: '/reports/maintenance',
      isActive: true,
      createdAt: '2023-01-06T00:00:00.000Z',
    },
  },
  {
    id: '4',
    userId: '5',
    reportId: '8',
    justification: 'Necessário para análise de vendas do trimestre.',
    status: 'rejected',
    requestedAt: '2023-04-10T16:45:00.000Z',
    reviewedAt: '2023-04-11T10:20:00.000Z',
    reviewedBy: '1',
    reviewerComments: 'Rejeitado por falta de permissões departamentais.',
    user: {
      id: '5',
      username: 'ana.rodrigues',
      email: 'ana.rodrigues@mcqueen.com',
      fullName: 'Ana Rodrigues',
      isAdmin: false,
      lastLogin: '2023-04-19T16:05:00.000Z',
      createdAt: '2023-03-01T00:00:00.000Z',
    },
    report: {
      id: '8',
      name: 'Relatório de Vendas',
      description: 'Análise detalhada de vendas e faturamento.',
      category: 'Financeiro',
      urlPath: '/reports/sales',
      isActive: true,
      createdAt: '2023-01-08T00:00:00.000Z',
    },
  },
];

const AdminDashboard = () => {
  const [requests, setRequests] = useState<AccessRequest[]>(mockRequests);
  const [activeTab, setActiveTab] = useState('requests');

  const pendingCount = requests.filter(req => req.status === 'pending').length;

  const handleApproveRequest = (request: AccessRequest, comments: string) => {
    setRequests(prev => prev.map(req => 
      req.id === request.id
        ? {
            ...req,
            status: 'approved',
            reviewedAt: new Date().toISOString(),
            reviewedBy: '1', // Current admin ID
            reviewerComments: comments,
          }
        : req
    ));
  };

  const handleRejectRequest = (request: AccessRequest, comments: string) => {
    setRequests(prev => prev.map(req => 
      req.id === request.id
        ? {
            ...req,
            status: 'rejected',
            reviewedAt: new Date().toISOString(),
            reviewedBy: '1', // Current admin ID
            reviewerComments: comments,
          }
        : req
    ));
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
        <p className="text-gray-600 mt-1">Gerencie usuários e solicitações de acesso</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Solicitações Pendentes</CardTitle>
            <CardDescription>Aprovações aguardando revisão</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-mcqueen-600">{pendingCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total de Usuários</CardTitle>
            <CardDescription>Usuários registrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-mcqueen-600">5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Funcionalidades</CardTitle>
            <CardDescription>Relatórios e ferramentas disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-mcqueen-600">8</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="requests" className="relative">
            Solicitações
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-mcqueen-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {pendingCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="requests">
            <PendingRequests 
              requests={requests}
              onApprove={handleApproveRequest}
              onReject={handleRejectRequest}
            />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
