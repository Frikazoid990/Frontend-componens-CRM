import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authApiRoutes } from '@/constants/routes';
import { useSession } from '@/hooks/useSession';
import { useNavigate } from '@tanstack/react-router';
import type { UUID } from 'crypto';
import { CarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoginFormType {
  phoneNumber: string;
  password: string;
}

interface RegisterFormType {
  fullName: string;
  phoneNumber: string;
  password: string;
}

const initialLoginForm: LoginFormType = {
  phoneNumber: '',
  password: '',
};

const initialRegisterForm: RegisterFormType = {
  fullName: '',
  phoneNumber: '',
  password: '',
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState<LoginFormType>(initialLoginForm);
  const [registerForm, setRegisterFrom] = useState<RegisterFormType>(initialRegisterForm);
  const [error, setError] = useState<string | null>(null); // <-- Состояние для ошибок
  const user = useSession();
  const submitHandler = async () => {
    setError(null); // Сброс предыдущей ошибки
    if (activeTab === 'login') {
      await loginHandler(loginForm);
    } else if (activeTab === 'register') {
      await registerHandler(registerForm);
    }
  };

  const loginHandler = async (loginForm: LoginFormType): Promise<void> => {
    if (!loginForm.password || !loginForm.phoneNumber) {
      setError('Все поля обязательны к заполнению');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('password', loginForm.password);
      formData.append('phoneNumber', loginForm.phoneNumber);

      const response = await fetch(import.meta.env.VITE_API_URL + authApiRoutes.signIn, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        setError('Неверный номер телефона или пароль');
        return;
      }
      if (user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'CLIENT') navigate({ to: '/' });
      else navigate({ to: '/manager/dashboard' });
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Unknown error occurred');
      setError('Произошла ошибка. Попробуйте позже.');
    }
  };

  const registerHandler = async (registerForm: RegisterFormType): Promise<void> => {
    if (!registerForm.password || !registerForm.phoneNumber || !registerForm.fullName) {
      setError('Все поля обязательны к заполнению');
      return;
    }

    try {
      const requestBody = JSON.stringify(registerForm);
      const response = await fetch(import.meta.env.VITE_API_URL + authApiRoutes.registration, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
        credentials: 'include',
      });

      if (!response.ok) {
        setError('Ошибка регистрации. Попробуйте позже.');
        return;
      }
      const createdUserId: UUID = await response.json();
      if (createdUserId) {
        if (user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'CLIENT') navigate({ to: '/' });
        else navigate({ to: '/manager/dashboard' });
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Unknown error occurred');
      setError('Произошла ошибка. Попробуйте позже.');
    }
  };

  useEffect(() => {
    if (user) navigate({ to: '/' });
  }, []);

  const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center space-x-2">
          <CarIcon className="h-6 w-6" />
          <CardTitle className="text-2xl">Автоцентр</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {/* --- Отображение ошибки здесь --- */}
        {error && (
          <div className="mb-4 rounded-md border border-red-100 bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={value => {
            setLoginForm(initialLoginForm);
            setRegisterFrom(initialRegisterForm);
            setActiveTab(value);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="login-phone">Номер телефона</Label>
              <Input
                value={loginForm.phoneNumber}
                id="login-phone"
                type="tel"
                placeholder="+79998887766"
                onChange={e => {
                  setLoginForm(prev => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                }}
                onKeyDown={enterHandler}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Пароль</Label>
              <Input
                value={loginForm.password}
                id="login-password"
                type="password"
                onChange={e => {
                  setLoginForm(prev => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                onKeyDown={enterHandler}
              />
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">ФИО</Label>
              <Input
                value={registerForm.fullName}
                id="register-name"
                placeholder="Иванов Иван Иванович"
                onChange={e => {
                  setRegisterFrom(prev => ({
                    ...prev,
                    fullName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-phone">Номер телефона</Label>
              <Input
                value={registerForm.phoneNumber}
                id="register-phone"
                type="tel"
                placeholder="+79998887766"
                onChange={e => {
                  setRegisterFrom(prev => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                value={registerForm.password}
                id="register-password"
                type="password"
                onChange={e => {
                  setRegisterFrom(prev => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={submitHandler}>
          {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthPage;
