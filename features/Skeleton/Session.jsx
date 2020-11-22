// import React from "react";

// const Session = () => {
//   return (
//     <a className="block hover:bg-gray-50">
//       <div className="flex items-center px-4 py-4 sm:px-6">
//         <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
//           <div>
//             <div className="flex text-sm font-medium text-indigo-600 truncate">
//               <p className="capitalize">Wonderful title</p>
//               <p className="ml-1 font-normal text-gray-500">
//                 {imageCount} images
//               </p>
//             </div>
//             <div className="flex mt-2">
//               <div className="flex items-center text-sm text-gray-500">
//                 <svg
//                   className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <p>
//                   Estimated Duration:{" "}
//                   <span className="font-medium">{duration}</span> minutes
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex-shrink-0 mt-4 sm:mt-0">
//             <div className="flex overflow-hidden">
//               {session.data.session.map((image, idx) => {
//                 if (idx === 0) {
//                   return (
//                     <img
//                       key={idx}
//                       className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
//                       src={image.image}
//                       alt="hello"
//                     />
//                   );
//                 } else {
//                   return (
//                     <img
//                       key={idx}
//                       className="inline-block w-6 h-6 -ml-1 rounded-full ring-2 ring-white"
//                       src={image.image}
//                       alt="hello"
//                     />
//                   );
//                 }
//               })}
//             </div>
//           </div>
//         </div>
//         <div className="flex-shrink-0 ml-5">
//           <svg
//             className="w-5 h-5 text-gray-400"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               fillRule="evenodd"
//               d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//       </div>
//     </a>
//   );
// };

// export default Session;
