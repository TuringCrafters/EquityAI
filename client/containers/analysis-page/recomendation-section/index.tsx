import { DataContext } from '@/services/provider';
import React, { useContext } from 'react'

export const Recommendations = () => {
    const { data } = useContext(DataContext);
  return (
    <>
    <section className='mx-20 mt-5 pb-10 py-5'>
      <h2 className="px-20 text-slate-950 text-2xl font-bold mb-5">
       Recommendations
      </h2>
      <p className="text-md text-neutral-500 mb-2 px-20">{data?.product_recommendation}</p>
      
    </section>
  </>
  )
}
