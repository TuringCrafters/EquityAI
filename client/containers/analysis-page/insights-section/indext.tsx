import { PayGapPieChart } from '@/components/PayGapChart/idex';
import { DataContext } from '@/services/provider';
import { splitTextIntoTwoParts } from '@/services/splitTextIntoTwoParts';
import React, { useContext } from 'react'

export const Insights = () => {
    const { data } = useContext(DataContext);
    const textToSplit = typeof data?.response === 'string' ? data.response : '';
    const { firstHalf, secondHalf } = splitTextIntoTwoParts(textToSplit);
  
    return (
      <>
        <section className='mx-20 mt-10 py-5 border-t-2 border-slate-200'>
          <h2 className="px-20 text-slate-950 text-2xl font-bold mb-5">
            Insights
          </h2>
          <p className="text-sm text-neutral-500 mb-2 px-20">
            {firstHalf}.
          </p>
          <PayGapPieChart/>
          <p className="text-sm text-neutral-500 mb-2 px-20">
            {secondHalf}
          </p>
        </section>
      </>
    );
  };

