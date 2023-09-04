import { AxiosGet } from "@/services/AxiosInstance";
import { useState } from "react";

const FecthMyData = () => {
  const [data, setData] = useState("");
  const handleFetch = async () => {
    try {
      const res = await AxiosGet("/auth/data");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleFetch}>Fetch Private data</button>;
};

export default FecthMyData;
