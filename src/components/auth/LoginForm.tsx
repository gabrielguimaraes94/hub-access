
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState<string>('');
  const { login, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Atualiza o status de autenticação
  useEffect(() => {
    if (isLoading) {
      setAuthStatus('Tentando autenticação com usuário do Windows...');
    } else if (!isAuthenticated) {
      setAuthStatus('Autenticação Windows falhou. Por favor, faça login manualmente.');
    }
  }, [isLoading, isAuthenticated]);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  // Show loading state while attempting Windows auth
  if (isLoading) {
    return (
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mcqueen-600"></div>
            <p className="text-center text-gray-600">{authStatus}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast({
        title: 'Login successful!',
        description: 'Welcome to Mcqueen Hub.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login error',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDomainLogin = () => {
    window.location.reload(); // Força uma nova tentativa de autenticação Windows
    toast({
      title: 'Recarregando...',
      description: 'Tentando novamente a autenticação com credenciais de domínio.',
    });
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Mcqueen Hub</CardTitle>
        <CardDescription className="text-center">
          {authStatus || 'Entre com suas credenciais'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou</span>
          </div>
        </div>
        
        <div className="flex flex-col w-full space-y-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleDomainLogin}
          >
            Tentar novamente com credenciais de domínio
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="mx-auto">
                Problemas com login automático?
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Informações de diagnóstico</DialogTitle>
                <DialogDescription>
                  Informações sobre seu ambiente que podem ajudar no diagnóstico.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">Ambiente:</p>
                  <p>Navegador: {navigator.userAgent}</p>
                  <p>Plataforma: {navigator.platform}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Suporte a recursos:</p>
                  <p>ActiveX disponível: {typeof ActiveXObject !== 'undefined' ? 'Sim' : 'Não'}</p>
                  <p>Variáveis de ambiente: {typeof process !== 'undefined' ? 'Disponíveis' : 'Indisponíveis'}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <p className="font-medium mb-1">Nota:</p>
                  <p>O login automático funciona melhor em navegadores IE/Edge em ambientes Windows corporativos.</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
