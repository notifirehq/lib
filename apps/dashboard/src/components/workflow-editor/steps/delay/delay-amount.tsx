import { NumberInputWithSelect } from '@/components/number-input-with-select';

import { FormLabel } from '@/components/primitives/form/form';
import { useMemo } from 'react';
import { TimeUnitEnum } from '@novu/shared';
import { useStep } from '@/components/workflow-editor/steps/step-provider';

const defaultUnitValues = Object.values(TimeUnitEnum);

const amountKey = 'amount';
const unitKey = 'unit';

export const DelayAmount = () => {
  const { step } = useStep();
  const { dataSchema } = step?.controls ?? {};

  const unitOptions = useMemo(
    () => (dataSchema?.properties?.[unitKey] as any).enum ?? defaultUnitValues,
    [dataSchema?.properties]
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <FormLabel tooltip="Delays workflow for the set time, then proceeds to the next step.">
        Delay execution by
      </FormLabel>
      <NumberInputWithSelect
        fields={{ inputKey: `controlValues.${amountKey}`, selectKey: `controlValues.${unitKey}` }}
        options={unitOptions}
      />
    </div>
  );
};
