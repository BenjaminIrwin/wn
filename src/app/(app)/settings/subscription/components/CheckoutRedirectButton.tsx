'use client';

import { useFormStatus, useFormState } from 'react-dom';
import { useEffect } from 'react';

import classNames from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import Button from '~/core/ui/Button';
import isBrowser from '~/core/generic/is-browser';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { createCheckoutAction } from '~/lib/stripe/actions';

const CheckoutRedirectButton: React.FCC<{
  disabled?: boolean;
  stripePriceId?: string;
  recommended?: boolean;
  onCheckoutCreated?: (clientSecret: string) => void;
}> = ({ children, onCheckoutCreated, ...props }) => {
  const [state, formAction] = useFormState(createCheckoutAction, {
    clientSecret: '',
  });

  useEffect(() => {
    if (state.clientSecret && onCheckoutCreated) {
      onCheckoutCreated(state.clientSecret);
    }
  }, [state.clientSecret, onCheckoutCreated]);

  return (
    <form data-cy={'checkout-form'} action={formAction}>
      <CheckoutFormData priceId={props.stripePriceId} />

      <SubmitCheckoutButton
        disabled={props.disabled}
        recommended={props.recommended}
      >
        {children}
      </SubmitCheckoutButton>
    </form>
  );
};

export default CheckoutRedirectButton;

function SubmitCheckoutButton(
  props: React.PropsWithChildren<{
    recommended?: boolean;
    disabled?: boolean;
  }>,
) {
  const { pending } = useFormStatus();

  return (
    <Button
      block
      className={classNames({
        'text-primary-foreground bg-primary dark:bg-white dark:text-gray-900':
          props.recommended,
      })}
      variant={props.recommended ? 'custom' : 'outline'}
      disabled={props.disabled}
      loading={pending}
    >
      <span className={'flex items-center space-x-2'}>
        <span>{props.children}</span>

        <ChevronRightIcon className={'h-4'} />
      </span>
    </Button>
  );
}

function CheckoutFormData(
  props: React.PropsWithChildren<{
    priceId: Maybe<string>;
  }>,
) {
  return (
    <>
      <input type="hidden" name={'returnUrl'} defaultValue={getReturnUrl()} />
      <input type="hidden" name={'priceId'} defaultValue={props.priceId} />
    </>
  );
}

function getReturnUrl() {
  return isBrowser()
    ? [window.location.origin, window.location.pathname].join('')
    : undefined;
}
