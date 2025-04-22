import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mcqueen-50 to-white p-4">
      <div className="w-full max-w-lg flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-mcqueen-700">Mcqueen</h1>
          <p className="text-gray-600">Centralized Access System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
