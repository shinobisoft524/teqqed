import React from 'react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/hooks/transaction'
import { useTransaction } from './transaction.hook'
import { TransactionView } from '@/components/ui/transaction-view'
import { InfoCard, InfoCardContent, InfoCardIcon, InfoCardTitle } from '@/components/ui/info-card'
import { AmountIcon40, TeqqedLogo40 } from '@/components/icons'

export default function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(useTransaction)

  return (
    <div className={`flex flex-col md:w-3/4 max-w-3xl w-full px-2 sm:px-2`}>
      <div className="font-semibold text-3xl">{`Overview`}</div>
      <div className={`flex flex-row mt-16 gap-4`}>
        <InfoCard>
          <InfoCardIcon>
            <TeqqedLogo40 />
          </InfoCardIcon>
          <InfoCardTitle>Proxies</InfoCardTitle>
          <InfoCardContent>3</InfoCardContent>
        </InfoCard>
        <InfoCard>
          <InfoCardIcon>
            <AmountIcon40 />
          </InfoCardIcon>
          <InfoCardTitle>Amount spent</InfoCardTitle>
          <InfoCardContent>$ 267,000</InfoCardContent>
        </InfoCard>
      </div>
      <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionView />
      </HydrationBoundary>
      </div>
    </div>
  );
}
