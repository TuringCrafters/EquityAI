import React, { useEffect } from 'react';
import { quantum } from 'ldrs';

const ProgressDisplay = () => {
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
          quantum.register();
        }
      }, []);
    
  return (
    <div className="w-5/6 h-4/6 mx-auto rounded-lg  flex flex-col items-center justify-center">
          <div className="">
            <l-quantum
              size="500"
              speed="4"
              color="white"
            ></l-quantum>
          </div>
          <h3 className="text-xl my-7 font-semibold text-white text-center">Analysing your data, stay put</h3>
        </div>
  )
}

export default ProgressDisplay