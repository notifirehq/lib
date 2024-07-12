import { IconButtonProps } from '@rjsf/utils';
import { ButtonHTMLAttributes, FC } from 'react';
import { IconType } from '../../icons';
import { css, cx } from '../../../styled-system/css';
import { Button, IconButton } from '../../components';
import { IconAdd, IconArrowDownward, IconArrowUpward, IconOutlineDeleteOutline } from '../../icons/icon-registry';

type Props = Omit<IconButtonProps, 'color' | 'translate' | 'iconType' | 'icon'>;

const SimpleIconButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & { Icon: IconType }> = ({
  Icon,
  title,
  ...buttonProps
}) => (
  <button className={css({ cursor: 'pointer', _hover: { opacity: 'hover' } })} {...buttonProps}>
    <Icon title={title} />
  </button>
);

export function RemoveButton(props: Props) {
  return <IconButton {...props} Icon={IconOutlineDeleteOutline} title="remove" />;
}

export function MoveUpButton(props: Props) {
  return <IconButton {...props} Icon={IconArrowUpward} title="move-up" />;
}

export function MoveDownButton(props: Props) {
  return <IconButton {...props} Icon={IconArrowDownward} title="move-down" />;
}

export function AddButton({ className, ...props }: Props) {
  return (
    <Button
      {...props}
      variant={'transparent'}
      size="md"
      Icon={IconAdd}
      className={cx(
        css({
          '& span': {
            color: 'typography.text.main',
            WebkitTextFillColor: 'unset',
          },
        }),
        className
      )}
    >
      Add item
    </Button>
  );
}
