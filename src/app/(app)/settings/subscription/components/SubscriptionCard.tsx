import React, { useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';

import PricingTable from '~/components/PricingTable';
import SubscriptionStatusAlert from '~/app/(app)/settings/subscription/components/SubscriptionStatusAlert';
import Subscription from '~/lib/subscriptions/subscription';

import configuration from '~/configuration';
import SubscriptionStatusBadge from '~/app/(app)/components/SubscriptionStatusBadge';

const locale = configuration.site.locale ?? 'en-US';

const SubscriptionCard: React.FC<{
  subscription: Subscription;
}> = ({ subscription }) => {
  const details = useSubscriptionDetails(subscription.priceId);
  const cancelAtPeriodEnd = subscription.cancelAtPeriodEnd;
  const isActive = subscription.status === 'active';

  const dates = useMemo(() => {
    return {
      endDate: new Date(subscription.periodEndsAt).toLocaleDateString(locale),
      trialEndDate: subscription.trialEndsAt
        ? new Date(subscription.trialEndsAt).toLocaleDateString(locale)
        : null,
    };
  }, [subscription]);

  if (!details) {
    return null;
  }

  return (
    <div className={'flex flex-col space-y-6'} data-cy={'subscription-card'}>
      <div className={'flex flex-col space-y-2'}>
        <div className={'flex items-center space-x-4'}>
          <Heading type={3}>
            <span data-cy={'subscription-name'}>{details.product.name}</span>
          </Heading>

          <SubscriptionStatusBadge subscription={subscription} />
        </div>

        <Heading type={6}>
          <span className={'text-gray-500 dark:text-gray-400'}>
            {details.product.description}
          </span>
        </Heading>
      </div>

      <div>
        <span className={'flex items-end'}>
          <PricingTable.Price>{details.plan.price}</PricingTable.Price>

          <span className={'lowercase text-gray-500 dark:text-gray-400'}>
            /{details.plan.name}
          </span>
        </span>
      </div>

      <SubscriptionStatusAlert subscription={subscription} values={dates} />

      <If condition={isActive}>
        <RenewStatusDescription
          dates={dates}
          cancelAtPeriodEnd={cancelAtPeriodEnd}
        />
      </If>
    </div>
  );
};

function RenewStatusDescription(
  props: React.PropsWithChildren<{
    cancelAtPeriodEnd: boolean;
    dates: {
      endDate: string;
      trialEndDate: string | null;
    };
  }>,
) {
  return (
    <span className={'flex items-center space-x-1.5 text-sm'}>
      <If condition={props.cancelAtPeriodEnd}>
        <XCircleIcon className={'h-5 text-yellow-700'} />

        <span>
          Your subscription is scheduled to be canceled on {props.dates.endDate}
        </span>
      </If>

      <If condition={!props.cancelAtPeriodEnd}>
        <CheckCircleIcon className={'h-5 text-green-700'} />

        <span>
          Your subscription is scheduled to be renewed on {props.dates.endDate}
        </span>
      </If>
    </span>
  );
}
function useSubscriptionDetails(priceId: string) {
  return useMemo(() => {
    for (const product of configuration.stripe.products) {
      for (const plan of product.plans) {
        if (plan.stripePriceId === priceId) {
          return { plan, product };
        }
      }
    }
  }, [priceId]);
}

export default SubscriptionCard;
