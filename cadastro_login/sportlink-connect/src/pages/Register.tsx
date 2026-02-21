import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Users, Building2, GraduationCap, Trophy, Loader2, Check, Lock } from 'lucide-react';
import FormField from '@/components/auth/FormField';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/auth/Stepper';
import { AthleteStep1 } from '@/components/auth/athlete/AthleteStep1';
import { AthleteStep2 } from '@/components/auth/athlete/AthleteStep2';
import { AthleteStep3 } from '@/components/auth/athlete/AthleteStep3';
import { AgentStep1 } from '@/components/auth/agent/AgentStep1';
import { AgentStep2 } from '@/components/auth/agent/AgentStep2';
import { AgentStep3 } from '@/components/auth/agent/AgentStep3';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/auth.service';
import type { AthleteRegistrationData, AgentRegistrationData, UserType } from '@/types/auth.types';
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalFooter, ModalOverlay, ModalTitle } from '@/components/ui/modal';
import { Reenviar } from '@/components/ui/reenviar';

type UserTypeSelection = 'atleta' | 'agente' | null;

const athleteInitialData: AthleteRegistrationData = {
  nome: '',
  email: '',
  senha: '',
  confirmar_senha: '',
  telefone: '',
  foto_perfil: undefined,
  data_nascimento: '',
  cidade: '',
  estado: '',
  altura_cm: 0,
  peso_kg: 0,
  sexo: 'masculino',
  disponivel_oportunidades: true,
  esporte: '',
  posicao: '',
  categoria: '',
  pe_dominante: 'direito',
  mao_dominante: 'direito',
  nivel_tecnico: 'iniciante',
  situacao: 'amador',
  bio: '',
};

const agentInitialData: AgentRegistrationData = {
  nome: '',
  email: '',
  senha: '',
  confirmar_senha: '',
  telefone: '',
  foto_perfil: undefined,
  tipo_perfil: 'empresario',
  nome_publico: '',
  descricao: '',
  cidade: '',
  estado: '',
  site: '',
  telefone_contato: '',
  email_contato: '',
  logo: undefined,
  tipo_documento: 'cpf',
  numero_documento: '',
  arquivo_documento: undefined,
};

const athleteValidationRules = {
  nome: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  senha: { required: true, minLength: 6 },
  confirmar_senha: {
    required: true,
    custom: (value: string, data: AthleteRegistrationData) =>
      value !== data.senha ? 'As senhas não coincidem' : null,
  },
  telefone: { required: true, pattern: /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/ },
  data_nascimento: { required: true },
  cidade: { required: true },
  estado: { required: true },
  esporte: { required: true },
  posicao: { required: true },
  categoria: { required: true },
};

const agentValidationRules = {
  nome: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  senha: { required: true, minLength: 6 },
  confirmar_senha: {
    required: true,
    custom: (value: string, data: AgentRegistrationData) =>
      value !== data.senha ? 'As senhas não coincidem' : null,
  },
  telefone: { required: true },
  tipo_perfil: { required: true },
  nome_publico: { required: true, minLength: 2 },
  cidade: { required: true },
  estado: { required: true },
  telefone_contato: { required: true },
  email_contato: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  tipo_documento: { required: true },
  numero_documento: { required: true },
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<UserTypeSelection>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [openModalCodigo, setOpenModalCodigo] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [ ErroCodigo, setErroCodigo] = useState(false);
  const [mensagemLoading, setMensagemLoading] = useState('')

  const athleteForm = useRegistrationForm(athleteInitialData, athleteValidationRules);
  const agentForm = useRegistrationForm(agentInitialData, agentValidationRules);

  const athleteSteps = ['Dados Básicos', 'Dados Pessoais', 'Perfil Esportivo'];
  const agentSteps = ['Dados Básicos', 'Perfil Profissional', 'Documentação'];

  

  const handleUserTypeSelect = (type: UserTypeSelection) => {
    setUserType(type);
    setCurrentStep(0);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setUserType(null);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const enviar_codigo = async () => {
    setLoading(true);
    
    try{
      const response = await authService.enviar_codigo(athleteForm.formData.email || agentForm.formData.email)
      if(response.success){
        setOpenModalCodigo(true);
        setLoading(false);
      }else {
      toast({
        title: 'Erro',
        description: response.message,
        variant: 'destructive',
      });
    }
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAthleteSubmit = async () => {
    setLoading(true);
    setMensagemLoading("Cadastrando...")
    try {
      const response = await authService.registerAthlete(athleteForm.formData);
      if (response && response.success) {
        setOpenModalCodigo(false);
        setSuccess(true);
        toast({
          title: 'Cadastro realizado!',
        description: "certo",
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast({
          title: 'Erro no cadastro!!',
          description: response.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setOpenModalCodigo(false);
      setLoading(false);
    }
  };

  const verificar_codigo = async () => {
    setLoading(true);
    setMensagemLoading('Verificando...')
    try{
      const response = await authService.verificar_codigo(athleteForm.formData.email || agentForm.formData.email, codigo)
      if(response && response.success){
        toast({
          title: 'Codigo Verificado!',
          description: "Codigo verificado com sucesso, realizando o seu cadastro! 🎉🎉",
        });
        if(userType === 'atleta'){

          handleAthleteSubmit();
          setMensagemLoading('Cadastrando...')
          return true;
        }
        if(userType === 'agente'){
          handleAgentSubmit();
          setMensagemLoading('Cadastrando...')
          return true;
        }
      }

      else{
        setLoading(false);
        toast({
          title: 'Erro ao verificar o codigo!',
          description: response.message,
          variant: 'destructive',
      })
      }
    }
    catch(error){
      setLoading(false);
      toast({
          title: 'Erro ao verificar o codigo!',
          description: error,
          variant: 'destructive',
      })
      setErroCodigo(true)
      return false;
    }
   
  }
  const handleAgentSubmit = async () => {
    setLoading(true);
    try {
      const response = await authService.registerAgent(agentForm.formData);
      if (response) {
        setSuccess(true);
        setOpenModalCodigo(false);
        setMensagem(response.message)
        toast({
          title: 'Cadastro realizado!',
          description: "ok",
        });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        toast({
          title: 'Erro no cadastro',
          description: "erro ao cadastrar",
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao realizar o cadastro',
        variant: 'destructive',
      });
    } finally {
      setOpenModalCodigo(false);
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Cadastro realizado com sucesso!
          </h1>
          <p className="text-muted-foreground mb-2">
            {userType === 'atleta'
              ? 'Bem-vindo ao SportLink! Você já pode fazer login.'
              : mensagem}
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecionando para o login...
          </p>
        </div>
      </div>
    );
  }

  // User type selection screen
  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="p-6">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center [background:var(--gradient-primary)] shadow-soft">
              <span className="text-xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Sport<span className="text-primary">Link</span>
            </span>
          </Link>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Como você quer usar o SportLink?
            </h1>
            <p className="text-muted-foreground mb-10">
              Escolha o tipo de perfil que melhor representa você
            </p>

            {/* Options */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Athlete option */}
              <button
                onClick={() => handleUserTypeSelect('atleta')}
                className="group p-6 sm:p-8 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all duration-300 text-left hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 [background:var(--gradient-primary)] group-hover:shadow-glow transition-shadow">
                  <Trophy className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Sou Atleta
                </h2>
                <p className="text-muted-foreground text-sm">
                  Mostre seu talento, conecte-se com clubes e encontre oportunidades na sua carreira esportiva.
                </p>
              </button>

              {/* Agent option */}
              <button
                onClick={() => handleUserTypeSelect('agente')}
                className="group p-6 sm:p-8 rounded-2xl bg-card border-2 border-border hover:border-accent transition-all duration-300 text-left hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 [background:var(--gradient-accent)] group-hover:shadow-glow transition-shadow">
                  <Building2 className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Sou Agente / Clube
                </h2>
                <p className="text-muted-foreground text-sm">
                  Empresários, agentes esportivos, clubes e escolinhas. Encontre talentos e gerencie sua equipe.
                </p>
              </button>
            </div>

            {/* Login link */}
            <p className="mt-10 text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Registration form
  return (
    <>
        <div className="min-h-screen flex flex-col bg-background">
          {/* Header */}
          <header className="p-4 sm:p-6 border-b border-border">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar</span>
              </button>

              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center [background:var(--gradient-primary)]">
                  <span className="text-sm font-bold text-primary-foreground">S</span>
                </div>
                <span className="text-lg font-bold text-foreground hidden sm:inline">
                  Sport<span className="text-primary">Link</span>
                </span>
              </Link>

              <div className="w-20"></div>
            </div>
          </header>

          {/* Stepper */}
          <div className="p-4 sm:p-6 border-b border-border bg-card/50">
            <div className="max-w-xl mx-auto">
              <Stepper
                steps={userType === 'atleta' ? athleteSteps : agentSteps}
                currentStep={currentStep}
              />
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-xl mx-auto">
              {userType === 'atleta' ? (
                <>
                  {currentStep === 0 && (
                    <AthleteStep1
                      formData={athleteForm.formData}
                      errors={athleteForm.errors}
                      setFieldValue={athleteForm.setFieldValue}
                      setFieldTouched={athleteForm.setFieldTouched}
                      onNext={handleNext}
                      validateForm={athleteForm.validateForm}
                    />
                  )}
                  {currentStep === 1 && (
                    <AthleteStep2
                      formData={athleteForm.formData}
                      errors={athleteForm.errors}
                      setFieldValue={athleteForm.setFieldValue}
                      setFieldTouched={athleteForm.setFieldTouched}
                      onNext={handleNext}
                      onBack={handleBack}
                      validateForm={athleteForm.validateForm}
                    />
                  )}
                  {currentStep === 2 && (
                    <AthleteStep3
                      formData={athleteForm.formData}
                      errors={athleteForm.errors}
                      setFieldValue={athleteForm.setFieldValue}
                      setFieldTouched={athleteForm.setFieldTouched}
                      enviar_codigo={enviar_codigo}
                      onBack={handleBack}
                      validateForm={athleteForm.validateForm}
                      loading={loading}
                    />
                  )}
                </>
              ) : (
                <>
                  {currentStep === 0 && (
                    <AgentStep1
                      formData={agentForm.formData}
                      errors={agentForm.errors}
                      setFieldValue={agentForm.setFieldValue}
                      setFieldTouched={agentForm.setFieldTouched}
                      onNext={handleNext}
                      validateForm={agentForm.validateForm}
                    />
                  )}
                  {currentStep === 1 && (
                    <AgentStep2
                      formData={agentForm.formData}
                      errors={agentForm.errors}
                      setFieldValue={agentForm.setFieldValue}
                      setFieldTouched={agentForm.setFieldTouched}
                      onNext={handleNext}
                      onBack={handleBack}
                      validateForm={agentForm.validateForm}
                    />
                  )}
                  {currentStep === 2 && (
                    <AgentStep3
                      formData={agentForm.formData}
                      errors={agentForm.errors}
                      setFieldValue={agentForm.setFieldValue}
                      setFieldTouched={agentForm.setFieldTouched}
                      enviar_codigo={enviar_codigo}
                      onBack={handleBack}
                      validateForm={agentForm.validateForm}
                      loading={loading}
                    />
                  )}

                
                
                </>
              )}
            </div>
          </div>
            
        </div>

         <Modal open={openModalCodigo} onClose={() => setOpenModalCodigo(false)}>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle className='mb-4 text-center'>Codigo de Segurança</ModalTitle>
                  <ModalDescription>

                    
                    <FormField 
                    label={'Foi enviado um codigo de verificação para: ' + athleteForm.formData.email || agentForm.formData.email}
                    type='number'
                    className={codigo.length == 4 ?  'border-green-500' : 'border-red-500'}
                    value={parseInt(codigo) || ''}
                    onChange={(e) => {
                      let value = e.target.value;
                      if(value.length <= 4){
                        setCodigo(value);
                      }
                    }}
                    error={ErroCodigo ? 'Codigo Invalido!' : null}
                    icon={<Lock className='w-5 h-5' />}
                    max={4}
                    />
                    <center>
                    <Reenviar 
                      onReenviar={() => {setMensagemLoading("Reenviando..."); enviar_codigo()}}
                      disabled={loading}
                      className='mt-3 underline underline-offset-4'
             
                    />
                    </center>
                  </ModalDescription>
                </ModalHeader>
            
                <ModalFooter>
                  <Button variant="destructive"  onClick={() => {setOpenModalCodigo(false); setLoading(false)}}>
                    Cancelar
                  </Button>
         
                  <Button disabled={codigo.length != 4 || loading} onClick={verificar_codigo} className='[background:var(--gradient-primary)]' variant="outline">
                    {loading ? (
                        <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                            {mensagemLoading}
                        </>
                        ) : (
                          <>
                            Verificar
                          </>
                      )}
                    
                  </Button>
                </ModalFooter>
              </ModalContent>
          </Modal>
    </>
    
  );
};

export default Register;
