import React, { useState } from 'react';
import { Calendar, MapPin, Ruler, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/auth/FormField';
import { SelectField } from '@/components/auth/SelectField';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ESTADOS_BRASIL, SEXO } from '@/constants/form-options';
import type { AthleteRegistrationData } from '@/types/auth.types';
import FileUpload from '../FileUpload';

interface AthleteStep2Props {
  formData: AthleteRegistrationData;
  errors: Partial<Record<keyof AthleteRegistrationData, string>>;
  setFieldValue: (field: keyof AthleteRegistrationData, value: any) => void;
  setFieldTouched: (field: keyof AthleteRegistrationData) => void;
  onNext: () => void;
  onBack: () => void;
  validateForm: (fields?: (keyof AthleteRegistrationData)[]) => boolean;
}



export const AthleteStep2: React.FC<AthleteStep2Props> = ({
  formData,
  errors,
  setFieldValue,
  setFieldTouched,
  onNext,
  onBack,
  validateForm,
}) => {
  const handleNext = () => {
    const isValid = validateForm(['data_nascimento', 'cidade', 'estado']);
    if (isValid) {
      onNext();
    }
  };

  const [arquivoUnico, setArquivoUnico] = useState<boolean>(false);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados Pessoais</h2>
        <p className="text-muted-foreground">Informações sobre você</p>
      </div>

      <div className="space-y-4">
        <FormField
          label="Data de nascimento"
          type="date"
          value={formData.data_nascimento}
          onChange={(e) => setFieldValue('data_nascimento', e.target.value)}
          onBlur={() => setFieldTouched('data_nascimento')}
          error={errors.data_nascimento}
          icon={<Calendar className="w-5 h-5" />}
          required
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Cidade"
            type="text"
            placeholder="Sua cidade"
            value={formData.cidade}
            onChange={(e) => setFieldValue('cidade', e.target.value)}
            onBlur={() => setFieldTouched('cidade')}
            error={errors.cidade}
            icon={<MapPin className="w-5 h-5" />}
            required
          />

          <SelectField
            label="Estado"
            value={formData.estado}
            onChange={(value) => setFieldValue('estado', value)}
            options={ESTADOS_BRASIL}
            placeholder="Selecione"
            error={errors.estado}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            label="Altura (cm)"
            type="number"
            placeholder="Ex: 175"
            value={formData.altura_cm || ''}
            onChange={(e) => setFieldValue('altura_cm', parseInt(e.target.value) || 0)}
            icon={<Ruler className="w-5 h-5" />}
          />

          <FormField
            label="Peso (kg)"
            type="number"
            placeholder="Ex: 70"
            value={formData.peso_kg || ''}
            onChange={(e) => setFieldValue('peso_kg', parseInt(e.target.value) || 0)}
            icon={<Weight className="w-5 h-5" />}
          />

          <SelectField
            label="Sexo"
            value={formData.sexo}
            onChange={(value) => setFieldValue('sexo', value as any)}
            options={SEXO}
          />

          
        </div>
         
        {arquivoUnico && (
          <div className='space-y-4'>
            <FileUpload
                variant="document"
                label="Upload do RG"
                hint="PDF, JPG ou PNG - Máximo 10MB"
                accept=".pdf,.jpg,.jpeg,.png"
                value={formData.arquivo_documento_unico}
                onChange={(file) => setFieldValue('arquivo_documento_unico', file)}
                error={errors.arquivo_documento_unico}
              />

              <p className="text-xs text-muted-foreground">
                Envie uma cópia legível do seu RG. As informações devem estar legiveis
                Quaisquer duvidas, siga o tutorial de como fazer uma foto boa!
              </p>
        </div>
        )}

        {!arquivoUnico && (
          <>
             <div className='space-y-4'>
          <FileUpload
              variant="document"
              label="Upload do RG (Frente)"
              hint="PDF, JPG ou PNG - Máximo 10MB"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.arquivo_documento_frente}
              onChange={(file) => setFieldValue('arquivo_documento_frente', file)}
              error={errors.arquivo_documento_frente}
            />
          
            <p className="text-xs text-muted-foreground">
              Envie uma cópia legível da parte do verso do seu RG. As informações devem estar legiveis
              Quaisquer duvidas, siga o tutorial de como fazer uma foto boa!
            </p>
        </div>
        <div className='space-y-4'>
          <FileUpload
              variant="document"
              label="Upload do RG (verso)"
              hint="PDF, JPG ou PNG - Máximo 10MB"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.arquivo_documento_verso}
              onChange={(file) => setFieldValue('arquivo_documento_verso', file)}
              error={errors.arquivo_documento_verso}
            />
          
            <p className="text-xs text-muted-foreground">
              Envie uma cópia legível da parte do verso do seu RG. As informações devem estar legiveis
              Quaisquer duvidas, siga o tutorial de como fazer uma foto boa!
            </p>
        </div>
          </>
        )}
        
       

        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
          <div>
            <Label htmlFor="disponivel" className="font-medium">
              Disponível para oportunidades
            </Label>
            <p className="text-sm text-muted-foreground">
              Agentes e clubes poderão entrar em contato
            </p>
          </div>
          <Switch
            id="disponivel"
            checked={formData.disponivel_oportunidades}
            onCheckedChange={(checked) => setFieldValue('disponivel_oportunidades', checked)}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          Voltar
        </Button>
        <Button variant="gradient" size="lg" onClick={handleNext} className="flex-1">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AthleteStep2;
