import React from 'react';
import { Loader2, FileCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/auth/FormField';
import { SelectField } from '@/components/auth/SelectField';
import { FileUpload } from '@/components/auth/FileUpload';
import { TIPO_DOCUMENTO } from '@/constants/form-options';
import type { AgentRegistrationData } from '@/types/auth.types';
import { cn } from '@/lib/utils';

interface AgentStep3Props {
  formData: AgentRegistrationData;
  errors: Partial<Record<keyof AgentRegistrationData, string>>;
  setFieldValue: (field: keyof AgentRegistrationData, value: any) => void;
  setFieldTouched: (field: keyof AgentRegistrationData) => void;
  enviar_codigo: () => void;
  onBack: () => void;
  validateForm: (fields?: (keyof AgentRegistrationData)[]) => boolean;
  loading: boolean;
}

export const AgentStep3: React.FC<AgentStep3Props> = ({
  formData,
  errors,
  setFieldValue,
  setFieldTouched,
  enviar_codigo,
  onBack,
  validateForm,
  loading,
}) => {
  const handleSubmit = () => {
    const isValid = validateForm(['tipo_documento', 'numero_documento']);
    if (isValid) {
      enviar_codigo();
    }
  };

  const formatDocument = (value: string, type: 'cpf' | 'cnpj') => {
    const numbers = value.replace(/\D/g, '');
    
    if (type === 'cpf') {
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    } else {
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
      if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
      if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Documentação</h2>
        <p className="text-muted-foreground">Documentos para validação do perfil</p>
      </div>

      {/* Warning notice */}
      <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">
            Verificação obrigatória
          </p>
          <p className="text-sm text-muted-foreground">
            Para garantir a segurança da plataforma, precisamos validar sua documentação. 
            Seu perfil ficará pendente até a aprovação.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Document type selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Tipo de documento <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {TIPO_DOCUMENTO.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setFieldValue('tipo_documento', type.value as any);
                  setFieldValue('numero_documento', '');
                }}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 font-medium",
                  formData.tipo_documento === type.value
                    ? "border-primary bg-primary/5 text-primary shadow-soft"
                    : "border-border hover:border-primary/50 bg-card text-muted-foreground"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <FormField
          label={formData.tipo_documento === 'cpf' ? 'Número do CPF' : 'Número do CNPJ'}
          type="text"
          placeholder={formData.tipo_documento === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
          value={formData.numero_documento}
          onChange={(e) =>
            setFieldValue(
              'numero_documento',
              formatDocument(e.target.value, formData.tipo_documento)
            )
          }
          onBlur={() => setFieldTouched('numero_documento')}
          error={errors.numero_documento}
          required
        />

        <FileUpload
          variant="document"
          label="Upload do documento"
          hint="PDF, JPG ou PNG - Máximo 10MB"
          accept=".pdf,.jpg,.jpeg,.png"
          value={formData.arquivo_documento}
          onChange={(file) => setFieldValue('arquivo_documento', file)}
          error={errors.arquivo_documento}
        />

        <p className="text-xs text-muted-foreground">
          Envie uma cópia legível do documento. Para pessoa física, envie o CPF. 
          Para pessoa jurídica, envie o cartão CNPJ ou contrato social.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1" disabled={loading}>
          Voltar
        </Button>
        <Button
          variant="gradient"
          size="lg"
          onClick={handleSubmit}
          className="flex-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando codigo...
            </>
          ) : (
            <>
              <FileCheck className="w-5 h-5" />
              Finalizar Cadastro
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AgentStep3;
