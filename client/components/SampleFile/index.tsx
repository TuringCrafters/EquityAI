'use client';
import Link from "next/link";

const samples = ["Dataset.csv"];

const SampleFileForUpload = () => {
    return (
        <div className="p-4">
    <h1 className="text-3xl mb-4">Try with Sample File:</h1>
        <ul className="flex flex-col gap-1">
      
          {samples.map((fileName) => {
            return (
                <li key={fileName} className="list-none">
    
              <Link href={`/samples/${fileName}`} target="_blank">
                Download {fileName}
              </Link>
              </li>
    
            );
          })}
        </ul>
        </div>
    
      );
    };    

export default SampleFileForUpload;