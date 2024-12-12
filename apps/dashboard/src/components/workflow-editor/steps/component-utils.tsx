import { UiComponentEnum } from '@novu/shared';

import { InAppAction } from '@/components/workflow-editor/steps/in-app/in-app-action';
import { InAppSubject } from '@/components/workflow-editor/steps/in-app/in-app-subject';
import { InAppBody } from '@/components/workflow-editor/steps/in-app/in-app-body';
import { InAppAvatar } from '@/components/workflow-editor/steps/in-app/in-app-avatar';
import { InAppRedirect } from '@/components/workflow-editor/steps/in-app/in-app-redirect';
import { DelayAmount } from '@/components/workflow-editor/steps/delay/delay-amount';
import { Maily } from '@/components/workflow-editor/steps/email/maily';
import { EmailSubject } from '@/components/workflow-editor/steps/email/email-subject';
import { DigestKey } from '@/components/workflow-editor/steps/digest/digest-key';
import { DigestWindow } from '@/components/workflow-editor/steps/digest/digest-window';

export const getComponentByType = ({ component }: { component?: UiComponentEnum }) => {
  switch (component) {
    case UiComponentEnum.IN_APP_AVATAR: {
      return <InAppAvatar />;
    }
    case UiComponentEnum.IN_APP_SUBJECT: {
      return <InAppSubject />;
    }
    case UiComponentEnum.IN_APP_BODY: {
      return <InAppBody />;
    }
    case UiComponentEnum.IN_APP_BUTTON_DROPDOWN: {
      return <InAppAction />;
    }
    case UiComponentEnum.URL_TEXT_BOX: {
      return <InAppRedirect />;
    }
    case UiComponentEnum.DELAY_AMOUNT:
    case UiComponentEnum.DELAY_UNIT:
    case UiComponentEnum.DELAY_TYPE: {
      return <DelayAmount />;
    }
    case UiComponentEnum.MAILY: {
      return <Maily />;
    }
    case UiComponentEnum.TEXT_INLINE_LABEL: {
      return <EmailSubject />;
    }
    case UiComponentEnum.DIGEST_KEY: {
      return <DigestKey />;
    }
    case UiComponentEnum.DIGEST_AMOUNT:
    case UiComponentEnum.DIGEST_UNIT:
    case UiComponentEnum.DIGEST_CRON: {
      return <DigestWindow />;
    }
    default: {
      return null;
    }
  }
};
