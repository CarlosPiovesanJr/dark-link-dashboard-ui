
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { AceternityInput } from "@/components/ui/aceternity-input";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { LogIn, Plus, Mail, Lock } from "lucide-react";
import { Navigate } from "react-router-dom";

const authSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(data.email, data.password);
      } else {
        await signIn(data.email, data.password);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    reset();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AceternityCard className="p-8">
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <LogIn className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isSignUp ? "Criar Conta" : "Portal de Suporte"}
            </h1>
            
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Crie sua conta para acessar o portal"
                : "Faça login para acessar seus links"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AceternityInput
              label="E-mail"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <AceternityInput
              label="Senha"
              type="password"
              icon={<Lock className="w-4 h-4" />}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <AceternityButton
              type="submit"
              className="w-full"
              loading={loading}
              icon={isSignUp ? <Plus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            >
              {isSignUp ? "Criar Conta" : "Entrar"}
            </AceternityButton>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <AceternityButton
              variant="outline"
              className="w-full mt-4"
              onClick={handleGoogleSignIn}
              loading={loading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </AceternityButton>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {isSignUp ? "Entrar" : "Criar conta"}
              </button>
            </p>
          </div>
        </AceternityCard>
      </motion.div>
    </div>
  );
};

export default Auth;
