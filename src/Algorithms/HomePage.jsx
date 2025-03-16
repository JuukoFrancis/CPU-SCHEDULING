// import { NavLink } from "react-router-dom";
// // import "./index.css";
// function HomePage() {
//   return (
//     <div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10">
//       <h1 className="text-4xl font-semibold text-blue-800 mb-6">
//         CPU SCHEDULING ALGORITHMS
//       </h1>

//       <ul className="space-y-4">
//         <li>
//           <NavLink
//             to="/firstComeFirstServe"
//             className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
//           >
//             1. First Come First Serve
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/shortestJobFirst"
//             className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
//           >
//             2. Shortest Job First
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/priorityScheduling"
//             className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
//           >
//             3. Priority Scheduling
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/roundRobinScheduler"
//             className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
//           >
//             4. Round Robin Scheduling
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default HomePage;

// // import { NavLink } from "react-router-dom";

// // function HomePage() {
// //   return (
// //     <div>
// //       <h1>CPU SCHEDULING ALGORITHMS</h1>
// //       <li>
// //         <NavLink to="/firstComeFirstServe">1. Fisrt Come Fist Serve</NavLink>
// //       </li>
// //       <li>
// //         <NavLink to="/shortestJobFirst">2. Shortest Job First</NavLink>
// //       </li>

// //       <li>
// //         <NavLink to="/priorityScheduling">3.PriorityScheduling</NavLink>
// //       </li>

// //       <li>
// //         <NavLink to="/roundRobinScheduler">4. RoundRobin Scheduling</NavLink>
// //       </li>
// //     </div>
// //   );
// // }

// // export default HomePage;

import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-8">
      <h1 className="text-4xl font-semibold text-blue-800 mb-6 text-center">
        CPU SCHEDULING ALGORITHMS BY GROUP E
      </h1>

      <ul className="space-y-4 text-center">
        <li>
          <NavLink
            to="/firstComeFirstServe"
            className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            1. First Come First Serve
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shortestJobFirst"
            className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            2. Shortest Job First
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/priorityScheduling"
            className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            3. Priority Scheduling
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/roundRobinScheduler"
            className="text-xl text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            4. Round Robin Scheduling
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
