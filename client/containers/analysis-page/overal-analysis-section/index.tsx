import React from 'react'

export const OveralAnalysis = () => {
    
  return (
    <><section className="flex flex-row justify-evenly mx-20 mt-10 py-5">
    <article className="w-1/2 border-r-2 border-slate-200">
      <div className="px-20">
        <h2 className="text-slate-950 text-2xl font-bold">
          Your company average worker
        </h2>
        <div className="flex flex-row justify-around my-5">
        <div className="bg-neutral-200 rounded-lg h-20 w-20"></div>
        <div className="bg-neutral-200 rounded-lg h-20 w-20"></div>
        <div className=" bg-neutral-200 rounded-lg h-20 w-20"></div>
        </div>
        <p className="text-sm text-neutral-500 mb-2">Number of employees</p>
        <h3 className="text-slate-950 text-2xl font-bold">
          PLACEHOLDER NUMBER
        </h3>
      </div>
    </article>
    <article className="w-1/2">
      <div className="px-20">
        <h2 className="text-slate-950 text-2xl font-bold mb-4">
          Your biggest earners
        </h2>
        <p className="text-sm text-neutral-500">
          These are the top 5 positions that have the biggest salary per
          month in your company.
        </p>
      </div>
    </article>
  </section>
    </>
  )
}
