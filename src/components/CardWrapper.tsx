import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  body?: ReactNode;
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  action?: () => void;
  actionLabel?: string;
  footer?: ReactNode;
  iconColor?: 'primary' | 'default' | 'secondary';
};

export default function CardWrapper({
  body,
  footer,
  headerIcon: Icon,
  headerText,
  subHeaderText,
  action,
  actionLabel,
  iconColor = 'default',
}: Props) {
  return (
    <div className='flex items-center justify-center vertical-center h-screen'>
      <Card className='w-full max-w-md mx-auto p-5 bg-background'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <div className='flex flex-col gap-2 items-center'>
            <Icon size={30} className={`text-${iconColor}`} />
            <div className='flex flex-row items-center gap-3'>
              <h1 className='text-3xl font-semibold text-foreground text-center'>
                {headerText}
              </h1>
            </div>
            {subHeaderText && (
              <p className='text-default-500'>{subHeaderText}</p>
            )}
          </div>
        </CardHeader>
        {body && <CardBody>{body}</CardBody>}
        <CardFooter className='flex flex-col justify-center'>
          {action && (
            <Button
              onClick={action}
              fullWidth
              color={iconColor}
              variant='solid'
              className='font-medium'
            >
              {actionLabel}
            </Button>
          )}
          {footer && <>{footer}</>}
        </CardFooter>
      </Card>
    </div>
  );
}
