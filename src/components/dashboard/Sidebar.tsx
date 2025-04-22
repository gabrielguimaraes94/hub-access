
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  User, 
  LogOut, 
  Users, 
  Settings,
  Search 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground">Hub Mcqueen</h2>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => navigate('/request-access')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Solicitar Acesso
        </Button>
        
        {user?.isAdmin && (
          <>
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-sidebar-foreground/70">Admin</p>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => navigate('/admin')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Painel Admin
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="mr-2 h-4 w-4" />
              Usuários
            </Button>
          </>
        )}
      </div>
      
      <div className="p-6 border-t border-sidebar-border">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
            <User className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.fullName}</p>
            <p className="text-xs text-sidebar-foreground/70">{user?.email}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start border-sidebar-foreground/20 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
