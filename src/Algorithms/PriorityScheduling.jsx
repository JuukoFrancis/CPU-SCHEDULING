// import { useEffect, useState } from "react";
// import Gantt from "./Gantt";

// function PriorityScheduling() {
//   const [burstInput, setBurstInput] = useState("");
//   const [calculate, setCalculate] = useState(false);
//   const [priority, setPriority] = useState("");

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
//     processes.sort((a, b) => Number(b.priorityTime) - Number(a.priorityTime));
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
//     if (!burstInput || !priority) return; // Do nothing if the input is empty
//     // if (burstInput <= 0 && priority <= 0) return;

//     // Create a new process with an auto-generated ID
//     const newProcess = {
//       id: processes.length + 1,
//       burstTime: burstInput,
//       priorityTime: priority,
//       waitingTime: 0,
//       turnaroundTime: 0,
//     };
//     setProcesses([...processes, newProcess]);
//     setBurstInput("");
//     setPriority("");
//     setCalculate(false);

//     // Update processes state
//     // const updatedProcesses = [...processes, newProcess];
//   }

//   function handleRun() {
//     const { processes: updatedProcessList } = calculateFCFS(processes);
//     setProcesses(updatedProcessList);
//     setCalculate((s) => !s);
//   }
//   // function handleHighestPriority(){
//   //   setProcesses(process=>process.map(pro=>))
//   // }

//   return (
//     <div>
//       <h2>Priority Scheduling Algorithm</h2>
//       <div>
//         <AddProcess
//           onAddProcess={handleAddProcess}
//           burstInput={burstInput}
//           setBurstInput={setBurstInput}
//           priority={priority}
//           setPriority={setPriority}
//         />
//       </div>
//       {processes.length > 0 && (
//         <TableProcess
//           processes={processes}
//           setProcesses={setProcesses}
//           calculate={calculate}
//           handleRun={handleRun}
//         />
//       )}

//       {/* <p>{`Average Waiting Time: ${averageWaitingTime?.toFixed(2)}`}</p>
//       <p>{`Average Turnaround Time: ${averageTurnaroundTime?.toFixed(2)}`}</p> */}
//     </div>
//   );
// }

// export default PriorityScheduling;

// function AddProcess({
//   burstInput,
//   setBurstInput,
//   onAddProcess,
//   priority,
//   setPriority,
// }) {
//   return (
//     <div>
//       <input
//         type="number"
//         value={burstInput}
//         onChange={(e) => setBurstInput(Number(e.target.value))}
//         placeholder="Enter burst time"
//       />

//       <input
//         type="number"
//         value={priority}
//         onChange={(e) => setPriority(Number(e.target.value))}
//         placeholder="Enter priority time"
//       />
//       {burstInput > 0 && (
//         <button onClick={() => onAddProcess(burstInput)}>Add Process</button>
//       )}
//       {/* <div>
//         <input
//           type="number"
//           value={priority}
//           onChange={(e) => setPriority(Number(e.target.value))}
//           placeholder="Enter burst time"
//         />
//         {priority > 0 && (
//           <button onClick={() => onAddProcess(burstInput)}>
//             Add Prirority
//           </button>
//         )}
//       </div> */}
//     </div>
//   );
// }

// function TableProcess({ processes, setProcesses, calculate, handleRun }) {
//   function handleClearProcess() {
//     setProcesses([]);
//   }

//   const items = processes;
//   // : processes.sort((a, b) => Number(a.burstTime) - Number(b.burstTime));

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
//             <th>Priority Time</th>
//             {calculate && (
//               <>
//                 <th>Waiting Time</th>
//                 <th>Turnaround Time</th>
//               </>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((process) => (
//             <tr key={process.id}>
//               <td>{process.id}</td>
//               <td>{process.burstTime}</td>
//               <td>{process.priorityTime}</td>
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
//         <>
//           <p>
//             <button onClick={handleRun}>Run Processes </button>
//           </p>
//         </>
//       )}

//       {calculate && (
//         <>
//           <p>Average Waiting Time: {`${averageWaitingTime.toFixed(2)}`}</p>
//           <p>Average Turnaround Time: {`${averageTurnTime.toFixed(2)}`}</p>
//         </>
//       )}
//       {calculate && (
//         <button onClick={handleClearProcess}>Clear All Processes </button>
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

function PriorityScheduling() {
  const [burstInput, setBurstInput] = useState("");
  const [calculate, setCalculate] = useState(false);
  const [priority, setPriority] = useState("");

  const [processes, setProcesses] = useState(function () {
    let storedValue;
    storedValue = localStorage.getItem("process");
    return JSON.parse(storedValue);
  });

  useEffect(
    function () {
      localStorage.setItem("process", JSON.stringify(processes));
    },
    [processes]
  );

  const calculateFCFS = (processes) => {
    processes.sort((a, b) => Number(b.priorityTime) - Number(a.priorityTime));
    processes = processes.map((process, i) => {
      if (i === 0) {
        process.waitingTime = 0;
      } else {
        process.waitingTime = processes[i - 1].turnaroundTime;
      }

      process.turnaroundTime = process.burstTime + process.waitingTime;
      return process;
    });

    return { processes };
  };

  function handleAddProcess(burstInput) {
    if (!burstInput || !priority) return;
    const newProcess = {
      id: processes.length + 1,
      burstTime: burstInput,
      priorityTime: priority,
      waitingTime: 0,
      turnaroundTime: 0,
    };
    setProcesses([...processes, newProcess]);
    setBurstInput("");
    setPriority("");
    setCalculate(false);
  }

  function handleRun() {
    const { processes: updatedProcessList } = calculateFCFS(processes);
    setProcesses(updatedProcessList);
    setCalculate((s) => !s);
  }

  return (
    <div className="p-6 sm:p-8 md:p-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-6">
        Priority Scheduling Algorithm
      </h2>
      <div className="mb-6">
        <AddProcess
          onAddProcess={handleAddProcess}
          burstInput={burstInput}
          setBurstInput={setBurstInput}
          priority={priority}
          setPriority={setPriority}
        />
      </div>
      {processes.length > 0 && (
        <TableProcess
          processes={processes}
          setProcesses={setProcesses}
          calculate={calculate}
          handleRun={handleRun}
        />
      )}
    </div>
  );
}

export default PriorityScheduling;

function AddProcess({
  burstInput,
  setBurstInput,
  onAddProcess,
  priority,
  setPriority,
}) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <input
        type="number"
        value={burstInput}
        onChange={(e) => setBurstInput(Number(e.target.value))}
        placeholder="Enter burst time"
        className="border p-2 rounded-md w-full sm:w-1/3 text-blue-800"
      />
      <input
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        placeholder="Enter priority time"
        className="border p-2 rounded-md w-full sm:w-1/3 text-blue-800"
      />
      {burstInput > 0 && (
        <button
          onClick={() => onAddProcess(burstInput)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Add Process
        </button>
      )}
    </div>
  );
}

function TableProcess({ processes, setProcesses, calculate, handleRun }) {
  function handleClearProcess() {
    setProcesses([]);
  }

  const averageWaitingTime =
    processes.reduce((acc, cur) => acc + cur.waitingTime, 0) / processes.length;

  const averageTurnTime =
    processes.reduce((acc, cur) => acc + cur.turnaroundTime, 0) /
    processes.length;

  return (
    <div className="mt-6">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2 text-left">Process ID</th>
            <th className="border p-2 text-left">Burst Time</th>
            <th className="border p-2 text-left">Priority Time</th>
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
            <tr key={process.id} className="hover:bg-gray-50">
              <td className="border p-2">{process.id}</td>
              <td className="border p-2">{process.burstTime}</td>
              <td className="border p-2">{process.priorityTime}</td>
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
        <div className="mt-4 flex justify-center sm:justify-start">
          <button
            onClick={handleRun}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Run Processes
          </button>
        </div>
      )}

      {calculate && (
        <>
          <div className="mt-4 text-blue-800">
            <p>Average Waiting Time: {`${averageWaitingTime.toFixed(2)}`}</p>
            <p>Average Turnaround Time: {`${averageTurnTime.toFixed(2)}`}</p>
          </div>
        </>
      )}
      {calculate && (
        <div className="mt-4 text-center">
          <button
            onClick={handleClearProcess}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Clear All Processes
          </button>
        </div>
      )}

      {calculate && (
        <div className="mt-6">
          <Gantt data={processes} />
        </div>
      )}
    </div>
  );
}
