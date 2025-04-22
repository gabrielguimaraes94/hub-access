
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Report } from '@/types';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FeatureCard from '@/components/dashboard/FeatureCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock reports data for development
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Relatório de Produção Diária',
    description: 'Visualize os dados de produção diária da planta com métricas e gráficos detalhados.',
    category: 'Produção',
    urlPath: '/reports/production-daily',
    isActive: true,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Dashboard de Qualidade',
    description: 'Análise de indicadores de qualidade e rejeitos por linha de produção.',
    category: 'Produção',
    urlPath: '/reports/quality',
    isActive: true,
    createdAt: '2023-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Gestão de Estoque',
    description: 'Controle de estoque de matéria-prima e produtos acabados.',
    category: 'Logística',
    urlPath: '/reports/inventory',
    isActive: true,
    createdAt: '2023-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Análise Financeira',
    description: 'Relatórios financeiros consolidados, incluindo custos operacionais e margens de lucro.',
    category: 'Financeiro',
    urlPath: '/reports/financial',
    isActive: true,
    createdAt: '2023-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Gestão de Recursos Humanos',
    description: 'Informações sobre colaboradores, turnos e produtividade.',
    category: 'RH',
    urlPath: '/reports/hr',
    isActive: true,
    createdAt: '2023-01-05T00:00:00.000Z',
  },
  {
    id: '6',
    name: 'Manutenção Preventiva',
    description: 'Calendário de manutenção e histórico de ocorrências por equipamento.',
    category: 'Operacional',
    urlPath: '/reports/maintenance',
    isActive: true,
    createdAt: '2023-01-06T00:00:00.000Z',
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredReports = mockReports.filter((report) => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenReport = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
    // This would typically navigate to the report or open it in an iframe
  };

  const handleRequestAccess = () => {
    navigate('/request-access');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hub de Funcionalidades</h1>
        <p className="text-gray-600 mt-1">Acesse os relatórios e ferramentas disponíveis para você</p>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar funcionalidades..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <FeatureCard
              key={report.id}
              report={report}
              onOpen={handleOpenReport}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Nenhuma funcionalidade encontrada</h3>
          <p className="text-gray-600 mt-1">Tente ajustar sua busca ou solicite acesso a novas funcionalidades</p>
          <Button onClick={handleRequestAccess} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Solicitar Acesso
          </Button>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReport?.name}</DialogTitle>
            <DialogDescription>
              Esta funcionalidade será aberta em uma nova tela.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Categoria: <span className="font-medium">{selectedReport?.category}</span></p>
            <p>{selectedReport?.description}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Funcionalidade aberta",
                description: `Abrindo ${selectedReport?.name}`,
              });
              setIsDialogOpen(false);
            }}>
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Dashboard;
