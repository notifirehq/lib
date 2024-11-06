import { FormLabel } from '@/components/primitives/form/form';
import { URLInput } from '../../url-input';
import { urlTargetTypes } from '@/utils/url';

export const InAppRedirect = () => {
  return (
    <div className="flex flex-col gap-1">
      <FormLabel hint="">Redirect URL</FormLabel>
      <URLInput
        options={urlTargetTypes}
        placeholder="/tasks/{{taskid}}"
        size="md"
        asEditor
        urlKey="redirect.url"
        targetKey="redirect.target"
      />
    </div>
  );
};
