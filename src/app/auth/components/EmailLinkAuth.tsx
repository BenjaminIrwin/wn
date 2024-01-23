'use client';

import type { FormEventHandler } from 'react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';
import useSignInWithOtp from '~/core/hooks/use-sign-in-with-otp';
import configuration from '~/configuration';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';

const EmailLinkAuth: React.FC = () => {
  const signInWithOtpMutation = useSignInWithOtp();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const email = data.get('email') as string;

      const origin = window.location.origin;
      const redirectUrl = [origin, configuration.paths.authCallback].join('');

      const promise = signInWithOtpMutation.trigger({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      await toast.promise(promise, {
        loading: `Sending email link...`,
        success: `Link successfully sent`,
        error: `Sorry, we encountered an error while sending your link. Please try
          again`,
      });
    },
    [signInWithOtpMutation],
  );

  if (signInWithOtpMutation.data) {
    return (
      <Alert type={'success'}>
        We sent you a link to your email! Follow the link to sign in.
      </Alert>
    );
  }

  return (
    <form className={'w-full'} onSubmit={onSubmit}>
<div className={'flex flex-col sm:flex-row justify-center space-x-4 items-center'}>
  <TextField className={'w-5/6 md:7/12'} >
      <TextField.Input
        className={'text-base leading-6 h-12'}
        data-cy={'email-input'}
        required
        type="email"
        placeholder={'your@email.com'}
        name={'email'}
      />
  </TextField>

  <Button round variant={'custom'} loading={signInWithOtpMutation.isMutating} 
  className={
        'w-5/6 md:w-5/12 mt-3 md:mt-0 h-12 bg-transparent bg-gradient-to-r shadow-2xl' +
        ' hover:shadow-primary/60 from-primary' +
        ' to-primary-600 text-white'
      }
      >
    <If
      condition={signInWithOtpMutation.isMutating}
      fallback={<span className={'flex items-center space-x-2'}>
      <span>Get Started</span>
      <ChevronRightIcon
        className={
          'h-4 animate-in fade-in slide-in-from-left-8' +
          ' delay-1000 fill-mode-both duration-1000 zoom-in'
        }
      />
    </span>}
    >
      Sending email link...
    </If>
  </Button>
</div>


      <If condition={signInWithOtpMutation.error}>
        <Alert type={'error'}>
          Sorry, we encountered an error while sending your link. Please try
          again
        </Alert>
      </If>
    </form>
  );
};

export default EmailLinkAuth;
