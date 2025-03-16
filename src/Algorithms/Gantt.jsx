import React from "react";

const Gantt = ({ data = [] }) => {
  // const data = [
  //   { id: 1, burstTime: 6 },
  //   { id: 2, burstTime: 8 },
  //   { id: 3, burstTime: 7 },
  //   { id: 4, burstTime: 3 },
  // ];

  // Calculate total time to scale the width properly
  const totalBurstTime = data?.reduce((acc, item) => acc + item.burstTime, 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        border: "1px solid black",
      }}
    >
      {data?.map((item, i) => (
        <div
          key={item?.id}
          style={{
            width: `${(item.burstTime / totalBurstTime) * 100}%`,
            backgroundColor: "#4caf50",
            height: "30px",
            margin: "2px",
            textAlign: "center",
            color: "white",
            lineHeight: "30px",
          }}
        >
          {/* {item.start
            ? `P${item?.pid}(${item?.start} - ${item?.end})` */}
          P {item?.id}({item?.turnaroundTime})
        </div>
      ))}
    </div>
  );
};

export default Gantt;
