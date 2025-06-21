import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authApiRoutes } from '@/constants/routes';
import { useNavigate } from '@tanstack/react-router';
import type { UUID } from 'crypto';
import { CarIcon } from 'lucide-react';
import { useState } from 'react';

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

  const submitHandler = () => {
    if (activeTab === 'login') {
      loginHandler(loginForm);
    } else if (activeTab === 'register') {
      registerHandler(registerForm);
    }
    setLoginForm(initialLoginForm);
    setRegisterFrom(initialRegisterForm);
    navigate({ to: '/' });
  };

  const loginHandler = async (loginForm: LoginFormType): Promise<void> => {
    if (!loginForm.password) throw new Error('Password is required');
    if (!loginForm.phoneNumber) throw new Error('Phone number is required');

    // debugger;
    try {
      // const requestBody = JSON.stringify(loginForm);

      const formData = new FormData();
      formData.append('password', loginForm.password);
      formData.append('phoneNumber', loginForm.phoneNumber);

      const response = await fetch(import.meta.env.VITE_API_URL + authApiRoutes.signIn, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const registerHandler = async (registerForm: RegisterFormType): Promise<void> => {
    // debugger;
    if (!registerForm.password) throw new Error('Password is required');
    if (!registerForm.phoneNumber) throw new Error('Phone number is required');
    if (!registerForm.fullName) throw new Error('Full name is required');
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
        throw new Error('Network response was not ok');
      }

      const createdUserId: UUID = await response.json();
      if (createdUserId) {
        console.log('Deal created successfully:', createdUserId);
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center space-x-2">
          <CarIcon className="h-6 w-6" />
          <CardTitle className="text-2xl">Auto Dealer CRM</CardTitle>
        </div>
        <CardDescription className="text-center">Access your dealership management system</CardDescription>
      </CardHeader>
      <CardContent>
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
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="login-phone">Phone Number</Label>
              <Input
                value={loginForm.phoneNumber}
                id="login-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                onChange={e => {
                  setLoginForm(prev => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
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
              />
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">Full Name</Label>
              <Input
                value={registerForm.fullName}
                id="register-name"
                placeholder="John Smith Johnson"
                onChange={e => {
                  setRegisterFrom(prev => ({
                    ...prev,
                    fullName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-phone">Phone Number</Label>
              <Input
                value={registerForm.phoneNumber}
                id="register-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                onChange={e => {
                  setRegisterFrom(prev => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
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
          {activeTab === 'login' ? 'Login' : 'Register'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthPage;
