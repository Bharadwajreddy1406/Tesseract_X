import { React } from "react";
import ChatBotCircle from "./ChatBotCircle";

const StudentDashboard = () => {
  // Sample JSON data
  const jsonData = [
    {
      subject: "DATABASE MANAGEMENT SYSTEMS",
      greenBadge: "14 of 19",
      blueBadge: "9 of 19",
      redBadge: "1 of 5",
      brownBadge: "0"
    },
    {
      subject: "Data Structures",
      greenBadge: "11 of 13",
      blueBadge: "7 of 13",
      redBadge: "3 of 5",
      brownBadge: "0"
    },
    {
      subject: "Algorithms",
      greenBadge: "24 of 31",
      blueBadge: "13 out of 31",
      redBadge: "4 of 5",
      brownBadge: "0"
    }
  ];

  return (
    <>
      <div className="m-6">
        <div className="p-7 bg-slate-300 rounded-lg my-3" style={{ fontSize: "24px" }}>
          <h1 className="text-black font-bold ">DashBoard</h1>
        </div>
        <table className="table-auto w-full bg-blue-300 rounded-lg">
          <thead>
            <tr>
              <th className="text-center text-black  p-5 w-1/3">Subject</th>
              <th className="text-center text-white p-5 w-1/6">
                <div className="flex items-center justify-center">
                  <img src='/greenbadge.png' alt="greenBadge" style={{ height: "30px" }} />
                </div>
              </th>
              <th className="text-center text-white p-5 w-1/6">
                <div className="flex items-center justify-center">
                  <img src='/blueBadge.png' alt="blueBadge" style={{ height: "30px" }} />
                </div>
              </th>
              <th className="text-center text-white p-5 w-1/6">
                <div className="flex items-center justify-center">
                  <img src='/legitBadge.png' alt="redBadge" style={{ height: "30px" }} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className=" bg-blue-100 rounded-b-lg">
            {jsonData.map((item, index) => (
              <tr key={index} className=" border-b-2 ">
                <td className="text-center p-6 font-bold">{item.subject}</td>
                <td className="text-center p-6">{item.greenBadge}</td>
                <td className="text-center p-6">{item.blueBadge}</td>
                <td className="text-center p-6">{item.redBadge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed bottom-10 right-20">
        <ChatBotCircle />
      </div>
    </>
  );
};

export default StudentDashboard;
