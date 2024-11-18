import { createContext } from 'react';
import { type StepDataDto, StepTypeEnum } from '@novu/shared';

export type StepEditorContextType = {
  isPendingStep: boolean;
  isRefetchingStep: boolean;
  step?: StepDataDto;
  stepType?: StepTypeEnum;
};

export const StepEditorContext = createContext<StepEditorContextType>({} as StepEditorContextType);
