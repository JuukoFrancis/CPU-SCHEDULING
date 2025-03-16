// import { useEffect, useState } from "react";
// import Gantt from "./Gantt";

// function FirstComeFirstServe() {
//   const [burstInput, setBurstInput] = useState("");

//   const [processes, setProcesses] = useState(function () {
//     let storedValue;
//     storedValue = localStorage.getItem("process");
//     return JSON.parse(storedValue);
//   });

//   useEffect(
//     function () {
//       localStorage.setItem("process", JSON.stringify(processes));
//     },
//     [processes]
//   );
//   const calculateFCFS = (processes) => {
//     // Use map to calculate waitingTime and turnaroundTime for each process
//     processes = processes.map((process, i) => {
//       if (i === 0) {
//         process.waitingTime = 0; // First process has no waiting time
//       } else {
//         process.waitingTime = processes[i - 1].turnaroundTime;
//       }

//       process.turnaroundTime = process.burstTime + process.waitingTime;

//       return process; // Return the modified process object
//     });

//     return {
//       processes,
//     };
//   };

//   // const average

//   function handleAddProcess(burstInput) {
//     if (!burstInput) return; // Do nothing if the input is empty

//     // Create a new process with an auto-generated ID
//     const newProcess = {
//       id: processes.length + 1,
//       burstTime: burstInput,
//       waitingTime: 0,
//       turnaroundTime: 0,
//     };

//     // Update processes state
//     const updatedProcesses = [...processes, newProcess];
//     const { processes: updatedProcessList } = calculateFCFS(updatedProcesses);
//     setProcesses(updatedProcessList);
//     setBurstInput("");
//   }

//   return (
//     <div>
//       <h2>First Come First Serve Algorithm</h2>
//       <div>
//         <AddProcess
//           onAddProcess={handleAddProcess}
//           burstInput={burstInput}
//           setBurstInput={setBurstInput}
//         />
//       </div>
//       {processes.length > 0 && (
//         <TableProcess processes={processes} setProcesses={setProcesses} />
//       )}

//       {/* <p>{`Average Waiting Time: ${averageWaitingTime?.toFixed(2)}`}</p>
//       <p>{`Average Turnaround Time: ${averageTurnaroundTime?.toFixed(2)}`}</p> */}
//     </div>
//   );
// }

// export default FirstComeFirstServe;

// function AddProcess({ burstInput, setBurstInput, onAddProcess }) {
//   return (
//     <div>
//       <input
//         type="number"
//         value={burstInput}
//         onChange={(e) => setBurstInput(Number(e.target.value))}
//         placeholder="Enter burst time"
//       />
//       {burstInput > 0 && (
//         <button onClick={() => onAddProcess(burstInput)}>Add Process</button>
//       )}
//     </div>
//   );
// }

// function TableProcess({ processes, setProcesses }) {
//   const [calculate, setCalculate] = useState(false);
//   function handleClearProcess() {
//     setProcesses([]);
//   }
//   const averageWaitingTime =
//     processes.reduce((acc, cur) => {
//       acc += cur.waitingTime;
//       return acc;
//     }, 0) / processes.length;

//   const averageTurnTime =
//     processes.reduce((acc, cur) => {
//       acc += cur.turnaroundTime;
//       return acc;
//     }, 0) / processes.length;
//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Process ID</th>
//             <th>Burst Time</th>
//             {calculate && (
//               <>
//                 <th>Waiting Time</th>
//                 <th>Turnaround Time</th>
//               </>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {processes.map((process) => (
//             <tr key={process.id}>
//               <td>{process.id}</td>
//               <td>{process.burstTime}</td>
//               {calculate && (
//                 <>
//                   <td>{process.waitingTime}</td>
//                   <td>{process.turnaroundTime}</td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {processes.length > 1 && (
//         <button onClick={() => setCalculate((s) => !s)}>Run Processes </button>
//       )}

//       {calculate && (
//         <>
//           <p>Average Waiting Time: {`${averageWaitingTime.toFixed(2)}`}</p>
//           <p>Average Turnaround Time: {`${averageTurnTime.toFixed(2)}`}</p>
//         </>
//       )}
//       {calculate && (
//         <p>
//           <button onClick={handleClearProcess}>Clear All Processes </button>
//         </p>
//       )}

//       {calculate && (
//         <div>
//           <Gantt data={processes} />
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Gantt from "./Gantt";

function FirstComeFirstServe() {
  const [burstInput, setBurstInput] = useState("");

  const [processes, setProcesses] = useState(function () {
    let storedValue;
    storedValue = localStorage.getItem("process");
    return JSON.parse(storedValue) || [];
  });

  useEffect(
    function () {
      localStorage.setItem("process", JSON.stringify(processes));
    },
    [processes]
  );

  const calculateFCFS = (processes) => {
    processes = processes.map((process, i) => {
      if (i === 0) {
        process.waitingTime = 0; // First process has no waiting time
      } else {
        process.waitingTime = processes[i - 1].turnaroundTime;
      }
      process.turnaroundTime = process.burstTime + process.waitingTime;
      return process;
    });
    return {
      processes,
    };
  };

  function handleAddProcess(burstInput) {
    if (!burstInput && burstInput < 1) return; // Do nothing if the input is empty

    const newProcess = {
      id: processes.length + 1,
      burstTime: burstInput,
      waitingTime: 0,
      turnaroundTime: 0,
    };

    const updatedProcesses = [...processes, newProcess];
    const { processes: updatedProcessList } = calculateFCFS(updatedProcesses);
    setProcesses(updatedProcessList);
    setBurstInput("");
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
        First Come First Serve Algorithm
      </h2>

      <div className="mb-6">
        <AddProcess
          onAddProcess={handleAddProcess}
          burstInput={burstInput}
          setBurstInput={setBurstInput}
        />
      </div>

      {processes.length > 0 && (
        <TableProcess
          processes={processes}
          setProcesses={setProcesses}
          setBurstInput={setBurstInput}
        />
      )}
    </div>
  );
}

export default FirstComeFirstServe;

function AddProcess({ burstInput, setBurstInput, onAddProcess }) {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="number"
        value={burstInput}
        onChange={(e) => setBurstInput(Number(e.target.value))}
        placeholder="Enter burst time"
        className="border p-2 rounded-lg w-full sm:w-1/3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* {burstInput > 0 && ( */}
      <button
        onClick={() => onAddProcess(burstInput)}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Process
      </button>
    </div>
  );
}

function TableProcess({ processes, setProcesses, setBurstInput }) {
  const [calculate, setCalculate] = useState(false);

  function handleClearProcess() {
    setProcesses([]);
    setBurstInput("");
  }

  const averageWaitingTime =
    processes.reduce((acc, cur) => acc + cur.waitingTime, 0) / processes.length;

  const averageTurnTime =
    processes.reduce((acc, cur) => acc + cur.turnaroundTime, 0) /
    processes.length;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2 text-left">Process ID</th>
            <th className="border p-2 text-left">Burst Time</th>
            {calculate && (
              <>
                <th className="border p-2 text-left">Waiting Time</th>
                <th className="border p-2 text-left">Turnaround Time</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id} className="odd:bg-gray-50">
              <td className="border p-2">{process.id}</td>
              <td className="border p-2">{process.burstTime}</td>
              {calculate && (
                <>
                  <td className="border p-2">{process.waitingTime}</td>
                  <td className="border p-2">{process.turnaroundTime}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {processes.length > 1 && (
        <div className="mt-4">
          <button
            onClick={() => setCalculate((s) => !s)}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Run Processes
          </button>
        </div>
      )}

      {calculate && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-blue-600">
            Average Waiting Time: {averageWaitingTime.toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            Average Turnaround Time: {averageTurnTime.toFixed(2)}
          </p>
        </div>
      )}

      {calculate && (
        <div className="mt-4 text-center">
          <button
            onClick={handleClearProcess}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear All Processes
          </button>
        </div>
      )}

      {calculate && (
        <div className="mt-8">
          <Gantt data={processes} />
        </div>
      )}
    </div>
  );
}
