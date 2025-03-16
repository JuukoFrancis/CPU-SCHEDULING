//

import { useEffect, useState } from "react";
import Gantt from "./Gantt";

function ShortestJobFirst() {
  const [burstInput, setBurstInput] = useState("");
  const [calculate, setCalculate] = useState(false);

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
    processes.sort((a, b) => Number(a.burstTime) - Number(b.burstTime));
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
    if (!burstInput) return;

    const newProcess = {
      id: processes.length + 1,
      burstTime: burstInput,
      waitingTime: 0,
      turnaroundTime: 0,
    };
    setProcesses([...processes, newProcess]);
    setBurstInput("");
  }

  function handleRun() {
    const { processes: updatedProcessList } = calculateFCFS(processes);
    setProcesses(updatedProcessList);
    setCalculate((s) => !s);
  }

  return (
    <div className="p-6 sm:p-8 md:p-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-6">
        Shortest Job First Algorithm
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
          calculate={calculate}
          handleRun={handleRun}
          setBurstInput={setBurstInput}
        />
      )}
    </div>
  );
}

export default ShortestJobFirst;

function AddProcess({ burstInput, setBurstInput, onAddProcess }) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <input
        type="number"
        value={burstInput}
        onChange={(e) => setBurstInput(Number(e.target.value))}
        placeholder="Enter burst time"
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

function TableProcess({
  processes,
  setProcesses,
  calculate,
  handleRun,
  setBurstInput,
}) {
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
    <div className="mt-6">
      <table className="min-w-full border-collapse border border-gray-300">
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
            <tr key={process.id} className="hover:bg-gray-50">
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
        <div className="mt-4 text-blue-800">
          <p>Average Waiting Time: {`${averageWaitingTime.toFixed(2)}`}</p>
          <p>Average Turnaround Time: {`${averageTurnTime.toFixed(2)}`}</p>
        </div>
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
