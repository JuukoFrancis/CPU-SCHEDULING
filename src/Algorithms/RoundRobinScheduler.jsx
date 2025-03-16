//

import React, { useState } from "react";

const RoundRobinScheduler = () => {
  const [processes, setProcesses] = useState([]);
  const [burstTime, setBurstTime] = useState("");
  const [finalQuantum, setFinalQuantum] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [avgWaitingTime, setAvgWaitingTime] = useState(0);

  function addProcess() {
    if (!burstTime && burstTime < 1) return; // Do nothing if the input is empty

    // Create a new process with an auto-generated ID
    const newProcess = {
      pid: processes.length + 1,
      arrival: 0,
      burst: burstTime,
    };

    setProcesses([...processes, newProcess]);
    setBurstTime("");
  }

  const roundRobin = (processes, quantum) => {
    let queue = [...processes].sort((a, b) => a.arrival - b.arrival);
    let time = 0;
    let result = [];
    let waitingQueue = queue.slice();
    let processInfo = queue.reduce((acc, p) => {
      acc[p.pid] = {
        remainingBurst: p.burst,
        arrival: p.arrival,
        waitingTime: 0,
      };
      return acc;
    }, {});

    while (waitingQueue.length > 0) {
      let process = waitingQueue.shift();

      if (time < process.arrival) {
        time = process.arrival;
      }

      let executionTime = Math.min(
        processInfo[process.pid].remainingBurst,
        quantum
      );
      let startTime = time;
      time += executionTime;
      processInfo[process.pid].remainingBurst -= executionTime;

      result.push({ pid: process.pid, start: startTime, end: time });

      if (processInfo[process.pid].remainingBurst > 0) {
        waitingQueue.push(process);
      } else {
        processInfo[process.pid].waitingTime =
          time - process.arrival - process.burst;
      }
    }
    let groupedData = result?.reduce((acc, obj) => {
      if (!acc[obj.pid]) {
        acc[obj.pid] = [];
      }
      acc[obj.pid].push(obj.end);
      return acc;
    }, {});
    let maxValues = Object.values(groupedData).map((arr) => Math.max(...arr));
    let avgWaitingTime =
      maxValues.reduce((sum, val) => sum + val, 0) / maxValues.length;

    return { result, avgWaitingTime };
  };

  const calculateSchedule = () => {
    if (finalQuantum) {
      let { result, avgWaitingTime } = roundRobin(
        processes,
        parseInt(finalQuantum)
      );
      setSchedule(result);
      setAvgWaitingTime(avgWaitingTime);
    }
  };

  function handleClearProcess() {
    setSchedule([]);
    setProcesses([]);
    setFinalQuantum("");
    setAvgWaitingTime(0);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Round Robin Scheduler
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="number"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
          placeholder="Burst Time"
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <button
          onClick={addProcess}
          className="bg-blue-500 text-white p-2 rounded w-full sm:w-1/3"
        >
          Add Process
        </button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="number"
          value={finalQuantum}
          onChange={(e) => setFinalQuantum(e.target.value)}
          placeholder="Quantum Time"
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <button
          onClick={calculateSchedule}
          className="bg-green-500 text-white p-2 rounded w-full sm:w-1/3"
        >
          Calculate Schedule
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Process ID</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((entry, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{entry.pid}</td>
              <td className="border p-2">{entry.start}</td>
              <td className="border p-2">{entry.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="text-lg font-medium text-blue-500">
          Average Waiting Time: {`${Math.round(avgWaitingTime * 1000) / 1000}`}
        </p>
      </div>

      {schedule.length > 1 && (
        <div className="mt-4 text-center">
          <button
            onClick={handleClearProcess}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear All Processes
          </button>
        </div>
      )}
    </div>
  );
};

export default RoundRobinScheduler;
