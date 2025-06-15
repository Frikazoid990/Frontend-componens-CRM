"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarIcon } from "lucide-react"
import { useState } from "react"

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <CarIcon className="h-6 w-6" />
            <CardTitle className="text-2xl">Автосалон "Автоцентр XXI"</CardTitle>
          </div>

        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="login-phone">Телефонный номер</Label>
                <Input id="login-phone" type="tel" placeholder="+7 (999) 000 00 00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input id="login-password" type="password" />
              </div>
            </TabsContent>
            <TabsContent value="register" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">ФИО</Label>
                <Input id="register-name" placeholder="Иван Иванович Иванов" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Телефонный номер</Label>
                <Input id="register-phone" type="tel" placeholder="+7 (999) 000 00 00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input id="register-password" type="password" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{activeTab === "login" ? "Вход" : "Регистрация"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
