import prisma from '@/server/db';

import { queryOptions } from '@tanstack/react-query';

export async function getTransactions() {
  const count = await prisma.Transaction.count();

  const transactions = await prisma.Transaction.findMany({
    // skip: 40,
    // take: 10,
  });

  return { transactions, count };
}

export const useTransaction = queryOptions({
  queryKey: ['pokemon'],
  queryFn: async () => {
    const response = await getTransactions();

    return response;
  }
});
