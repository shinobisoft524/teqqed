'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import transactionViewStyles from '@/styles/transaction-view.module.css';
import { useTransaction } from 'app/(dashboard)/transaction.hook';
import ReactPaginate from 'react-paginate';
import { TransactionStatus } from '@/types/Enum';

const itemsPerPage = 7;

export function TransactionView() {
  const { data, isPending } = useSuspenseQuery(useTransaction);

  const { transactions, count } = data;

  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItems(transactions);
    setItemCount(count);
  }, [data]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  if (isPending) return <>loading</>;

  const { currentItems, pageCount } = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    return {
      currentItems,
      pageCount
    };
  }, [items, itemCount, itemOffset]);

  const StatusButton = ({ status }: { status: string }) => {
    if (status === TransactionStatus.Active)
      return (
        <span className={`bg-teal-700 px-2 py-1 rounded-sm`}>{status}</span>
      );
    if (status === TransactionStatus.Cancelled)
      return (
        <span className={`bg-slate-500 px-2 py-1 rounded-sm`}>{status}</span>
      );
    if (status === TransactionStatus.Pending)
      return (
        <span className={`bg-lime-800 px-2 py-1 rounded-sm`}>{status}</span>
      );
    if (status === TransactionStatus.Completed)
      return (
        <span className={`bg-pink-700 px-2 py-1 rounded-sm`}>{status}</span>
      );
    return <span>{status}</span>;
  };

  const TransactionList = useMemo(() => {
    return (
      <div className={`flex flex-col gap-2 mt-4`}>
        {currentItems &&
          currentItems.map((item: any, index: number) => (
            <div
              key={index.toString()}
              className={`${transactionViewStyles.transactionMinWidth} flex flex-row gap-8 text-sm  px-4 py-1.5 rounded-md items-center ${transactionViewStyles.dataTitleView}`}
            >
              <div className={`${transactionViewStyles.transactionName}`}>
                {item.name}
              </div>
              <div className={`flex-1`}>{item.method}</div>
              <div className={`flex-1`}>
                {new Intl.DateTimeFormat('en-US').format(item.createAt)}
              </div>
              <div className={`flex-1`}>
                $ {new Intl.NumberFormat().format(item.amount)}
              </div>
              <div className={`flex-1`}>
                <StatusButton status={item.status} />
              </div>
              <div className={`flex-1`}></div>
            </div>
          ))}
      </div>
    );
  }, [currentItems]);

  const css = `flex flex-col justify-center items-center`;

  return (
    <div className="mt-8">
      <div className="flex flex-row justify-between">
        <div>Latest transactions</div>
        <div>Vuew all</div>
      </div>
      <div
        className={`rounded-lg border shadow-sm p-4 mt-2 ${transactionViewStyles.container}`}
      >
        <div className={`${transactionViewStyles.scrollView} pb-1`}>
          <div
            className={`${transactionViewStyles.transactionMinWidth} flex flex-row gap-8 text-sm  px-4 py-1.5 rounded-md ${transactionViewStyles.dataTitleView}`}
          >
            <div className={`${transactionViewStyles.transactionName}`}>
              Name
            </div>
            <div className={`flex-1`}>Method</div>
            <div className={`flex-1`}>Created on</div>
            <div className={`flex-1`}>Amount</div>
            <div className={`flex-1`}>Status</div>
            <div className={`flex-1`}></div>
          </div>
          <div className={`flex flex-col gap-2 mt-4`}>{TransactionList}</div>
        </div>
        <div className={`hidden  flex-col gap-2 mt-4 sm:flex`}>
          <ReactPaginate
            className={`flex flex-col w-full ${transactionViewStyles.paginationBar}`}
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            previousClassName={`${css} w-20 mr-auto hover:text-yellow-400`}
            nextClassName={`${css} w-20 ml-auto hover:text-yellow-400`}
            pageClassName={`${css} rounded-full mx-1 w-10 h-10`}
            activeClassName={`${transactionViewStyles.activePagination}`}
          />
        </div>
        <div className={`flex  flex-col gap-2 mt-4 sm:hidden`}>
          <ReactPaginate
            className={`flex flex-col w-full ${transactionViewStyles.paginationBar}`}
            breakLabel=""
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            previousClassName={`${css} w-20 mr-auto hover:text-yellow-400`}
            nextClassName={`${css} w-20 ml-auto hover:text-yellow-400`}
            pageClassName={`hidden`}
            pageLabelBuilder={(number) => (
              <span>
                Page {number.toString()} of {pageCount.toString()}
              </span>
            )}
            activeClassName={`${transactionViewStyles.activeMobilePagination}`}
          />
        </div>
      </div>
    </div>
  );
}
