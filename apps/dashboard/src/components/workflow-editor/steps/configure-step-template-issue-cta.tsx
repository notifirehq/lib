import { Button } from '@/components/primitives/button';
import { SidebarContent } from '@/components/side-navigation/sidebar';
import TruncatedText from '@/components/truncated-text';
import { StepDataDto } from '@novu/shared';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

type ConfigureStepTemplateIssueCtaProps = {
  step: StepDataDto;
  issue: string;
};
export const ConfigureStepTemplateIssueCta = (props: ConfigureStepTemplateIssueCtaProps) => {
  const { step, issue } = props;

  return (
    <SidebarContent>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">Action required</span>
        <Link
          to="https://docs.novu.co/sdks/framework/typescript/steps/inApp"
          reloadDocument
          className="text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Help?</span>
        </Link>
      </div>
      <Link to={'./edit'} relative="path" state={{ stepType: step.type }}>
        <Button variant="outline" className="flex w-full justify-start gap-1.5 text-xs font-medium" type="button">
          <span className="bg-destructive h-4 min-w-1 rounded-full" />
          <TruncatedText>{issue}</TruncatedText>
          <RiArrowRightUpLine className="text-destructive ml-auto h-4 w-4" />
        </Button>
      </Link>
    </SidebarContent>
  );
};
