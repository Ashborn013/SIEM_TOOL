"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Input, Button, Form } from "@heroui/react";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { loginFormSchema } from "./formschema"; // Import the Zod schema

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const validateForm = () => {
        const result = loginFormSchema.safeParse(formData);
        const newErrors: Record<string, string> = {};
        if (!result.success) {
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0]] = err.message;
                }
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Login attempted with:', formData);
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ submit: 'Failed to login. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 px-4">
            <div className="w-full max-w-md">
                <Form
                    className="w-full space-y-6"
                    onSubmit={handleSubmit}
                >
                    <Card className="w-full p-8 shadow-2xl rounded-2xl bg-background/80 backdrop-blur-sm">
                        <CardHeader className="text-center space-y-2 mb-6">
                            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                            <p className="text-sm text-default-500">Please sign in to continue</p>
                        </CardHeader>

                        <CardBody className="space-y-6">
                            <div className="space-y-2">
                                <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-default-400" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        className={`pl-10 pr-4 py-2 w-full ${errors.email ? 'border-danger' : ''}`}
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-danger text-xs">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className={`pl-10 pr-4 py-2 w-full ${errors.password ? 'border-danger' : ''}`}
                                        required
                                        endContent={
                                            <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-default-400 hover:text-default-500"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                        }

                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-default-400" />
                                    
                                </div>
                                {errors.password && (
                                    <p className="text-danger text-xs">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-primary hover:text-primary-focus transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {errors.submit && (
                                <p className="text-danger text-sm text-center">{errors.submit}</p>
                            )}

                            <Button
                                type="submit"
                                color="primary"
                                className="w-full py-2 font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-background rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </CardBody>

                        <CardFooter className="text-center pt-6">
                            <p className="text-sm text-default-500">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-primary hover:text-primary-focus font-medium transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
        </div>
    );
}
