import React from 'react';
import { Loader2, Trophy, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/auth/FormField';
import { SelectField } from '@/components/auth/SelectField';
import { Textarea } from '@/components/ui/textarea';
import {
  ESPORTES,
  POSICOES_FUTEBOL,
  CATEGORIAS,
  PE_DOMINANTE,
  MAO_DOMINANTE,
  NIVEL_TECNICO,
  SITUACAO_ATLETA,
} from '@/constants/form-options';
import type { AthleteRegistrationData } from '@/types/auth.types';

interface AthleteStep3Props {
  formData: AthleteRegistrationData;
  errors: Partial<Record<keyof AthleteRegistrationData, string>>;
  setFieldValue: (field: keyof AthleteRegistrationData, value: any) => void;
  setFieldTouched: (field: keyof AthleteRegistrationData) => void;
  enviar_codigo: () => void;
  onBack: () => void;
  validateForm: (fields?: (keyof AthleteRegistrationData)[]) => boolean;
  loading: boolean;
}

export const AthleteStep3: React.FC<AthleteStep3Props> = ({
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
    const isValid = validateForm(['esporte', 'posicao', 'categoria']);
    if (isValid) {
      enviar_codigo();
    }
  };

  const esporteSelecionado = ESPORTES.find(
    (esporte) => esporte.value === formData.esporte
  );

  const posicoesDisponiveis = esporteSelecionado?.posicoes || [];

  const handleChangeEsporte = (value:string) => {
    setFieldValue('esporte', value)
    setFieldValue('posicao', '')
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Perfil Esportivo</h2>
        <p className="text-muted-foreground">Informações sobre sua carreira</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Esporte"
            value={formData.esporte}
            onChange={handleChangeEsporte}
            options={ESPORTES}
            placeholder="Selecione"
            error={errors.esporte}
            required
          />

          <SelectField
            label="Posição"
            value={formData.posicao}
            onChange={(value) => setFieldValue('posicao', value)}
            options={posicoesDisponiveis}
            placeholder={
              formData.esporte
                ? 'Selecione a posição'
                : 'Selecione primeiro o esporte'
            }
          error={errors.posicao}
          required
          disabled={!formData.esporte}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Categoria"
            value={formData.categoria}
            onChange={(value) => setFieldValue('categoria', value)}
            options={CATEGORIAS}
            placeholder="Selecione"
            error={errors.categoria}
            required
          />

          <SelectField
            label="Pé dominante"
            value={formData.pe_dominante}
            onChange={(value) => setFieldValue('pe_dominante', value as any)}
            options={PE_DOMINANTE}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField
            label="Mão dominante"
            value={formData.mao_dominante}
            onChange={(value) => setFieldValue('mao_dominante', value as any)}
            options={MAO_DOMINANTE}
          />

          <SelectField
            label="Nível técnico"
            value={formData.nivel_tecnico}
            onChange={(value) => setFieldValue('nivel_tecnico', value as any)}
            options={NIVEL_TECNICO}
          />

          <SelectField
            label="Situação"
            value={formData.situacao}
            onChange={(value) => setFieldValue('situacao', value as any)}
            options={SITUACAO_ATLETA}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Bio curta
          </label>
          <Textarea
            placeholder="Fale um pouco sobre você, suas conquistas e objetivos..."
            value={formData.bio || ''}
            onChange={(e) => setFieldValue('bio', e.target.value)}
            className="min-h-[100px] rounded-xl border-2 bg-secondary/30 focus:border-primary focus:bg-background transition-all"
          />
          <p className="text-xs text-muted-foreground">
            Máximo de 500 caracteres
          </p>
        </div>
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
              <Trophy className="w-5 h-5" />
              Finalizar Cadastro
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AthleteStep3;
