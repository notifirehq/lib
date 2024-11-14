import { Handle, Node as FlowNode, NodeProps, Position } from '@xyflow/react';
import { RiPlayCircleLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { STEP_TYPE_TO_COLOR } from '@/utils/color';
import { STEP_TYPE_TO_ICON } from '../icons/utils';
import { AddStepMenu } from './add-step-menu';
import { Node, NodeBody, NodeError, NodeHeader, NodeIcon, NodeName } from './base-node';
import { StepTypeEnum } from '@/utils/enums';
import { useWorkflowEditorContext } from './hooks';
import { buildRoute, ROUTES } from '@/utils/routes';
import { ComponentProps } from 'react';
import { cn } from '@/utils/ui';

export type NodeData = {
  name?: string;
  content?: string;
  addStepIndex?: number;
  stepSlug?: string;
  error?: string;
};

export type NodeType = FlowNode<NodeData>;

const topHandleClasses = `data-[handlepos=top]:w-2 data-[handlepos=top]:h-2 data-[handlepos=top]:bg-transparent data-[handlepos=top]:rounded-none data-[handlepos=top]:before:absolute data-[handlepos=top]:before:top-0 data-[handlepos=top]:before:left-0 data-[handlepos=top]:before:w-full data-[handlepos=top]:before:h-full data-[handlepos=top]:before:bg-neutral-alpha-200 data-[handlepos=top]:before:rotate-45`;

const bottomHandleClasses = `data-[handlepos=bottom]:w-2 data-[handlepos=bottom]:h-2 data-[handlepos=bottom]:bg-transparent data-[handlepos=bottom]:rounded-none data-[handlepos=bottom]:before:absolute data-[handlepos=bottom]:before:bottom-0 data-[handlepos=bottom]:before:left-0 data-[handlepos=bottom]:before:w-full data-[handlepos=bottom]:before:h-full data-[handlepos=bottom]:before:bg-neutral-alpha-200 data-[handlepos=bottom]:before:rotate-45`;

const handleClassName = `${topHandleClasses} ${bottomHandleClasses}`;

export const TriggerNode = (_props: NodeProps) => {
  return (
    <Node className="relative rounded-tl-none border-r">
      <div className="border-neutral-alpha-200 text-foreground-600 absolute -left-[1px] top-0 flex -translate-y-full items-center gap-1 rounded-t-lg border bg-neutral-50 px-2 py-1 text-xs font-medium">
        <RiPlayCircleLine className="size-3" />
        <span>TRIGGER</span>
      </div>
      <NodeHeader type={StepTypeEnum.TRIGGER}>
        <NodeName>Workflow trigger</NodeName>
      </NodeHeader>
      <NodeBody>This step triggers this workflow</NodeBody>
      <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
    </Node>
  );
};

type StepNodeProps = ComponentProps<typeof Node> & { data: NodeData };
const StepNode = (props: StepNodeProps) => {
  const { className, data, ...rest } = props;
  const { stepSlug } = useParams<{
    stepSlug: string;
  }>();

  return <Node aria-selected={stepSlug === data.stepSlug} className={cn('group', className)} {...rest} />;
};

export const EmailNode = ({ data }: NodeProps<NodeType>) => {
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.EMAIL];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.EMAIL}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.EMAIL]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'Email Step'}</NodeName>
        </NodeHeader>
        <NodeBody>Sends Email to your subscribers</NodeBody>
        {data.error && <NodeError>{data.error}</NodeError>}
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const SmsNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.SMS];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.SMS}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.SMS]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'SMS Step'}</NodeName>
        </NodeHeader>
        <NodeBody>Sends SMS notification to your subscribers</NodeBody>
        {data.error && <NodeError>{data.error}</NodeError>}
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const InAppNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.IN_APP];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.IN_APP}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.IN_APP]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'In-App Step'}</NodeName>
        </NodeHeader>
        <NodeBody>Sends In-app notification to your subscribers</NodeBody>
        {data.error && <NodeError>{data.error}</NodeError>}
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const PushNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.PUSH];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.PUSH}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.PUSH]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'Push Step'}</NodeName>
        </NodeHeader>
        <NodeBody>Sends push notification to your subscribers</NodeBody>
        {data.error && <NodeError>{data.error}</NodeError>}
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const ChatNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.CHAT];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.CHAT}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.CHAT]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'Chat Step'}</NodeName>
        </NodeHeader>
        <NodeBody>Sends chat notification to your subscribers</NodeBody>
        {data.error && <NodeError>{data.error}</NodeError>}
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const DelayNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.DELAY];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.DELAY}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.DELAY]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'Delay Step'}</NodeName>
        </NodeHeader>
        <NodeBody>{data.content || 'You have been invited to the Novu party on "commentSnippet"'}</NodeBody>
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const DigestNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.DIGEST];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.DIGEST}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.DIGEST]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'Digest Step'}</NodeName>
        </NodeHeader>
        <NodeBody>
          {data.content || 'Batches events into one coherent message before delivery to the subscriber.'}
        </NodeBody>
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const CustomNode = (props: NodeProps<NodeType>) => {
  const { data } = props;
  const Icon = STEP_TYPE_TO_ICON[StepTypeEnum.CUSTOM];

  return (
    <Link to={buildRoute(ROUTES.CONFIGURE_STEP, { stepSlug: data.stepSlug ?? '' })}>
      <StepNode data={data}>
        <NodeHeader type={StepTypeEnum.CUSTOM}>
          <NodeIcon variant={STEP_TYPE_TO_COLOR[StepTypeEnum.CUSTOM]}>
            <Icon />
          </NodeIcon>
          <NodeName>{data.name || 'Custom Step'}</NodeName>
        </NodeHeader>
        <NodeBody>Executes the business logic in your bridge application</NodeBody>
        <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
        <Handle isConnectable={false} className={handleClassName} type="source" position={Position.Bottom} id="b" />
      </StepNode>
    </Link>
  );
};

export const AddNode = (_props: NodeProps<NodeType>) => {
  const { addStep, isReadOnly } = useWorkflowEditorContext();

  if (isReadOnly) {
    return null;
  }

  return (
    <div className="flex w-[300px] cursor-pointer justify-center">
      <Handle isConnectable={false} className={handleClassName} type="target" position={Position.Top} id="a" />
      <AddStepMenu
        visible
        onMenuItemClick={(stepType) => {
          addStep(stepType);
        }}
      />
    </div>
  );
};
