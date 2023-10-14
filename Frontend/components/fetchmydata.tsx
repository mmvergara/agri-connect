import { AxiosGet } from "@/services/AxiosInstance";
import { useState } from "react";

const FecthMyData = () => {
  const handleFetch = async () => {
    try {
      const res = await AxiosGet("/auth/data");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleFetch}>Fetch Private data</button>;
};

export default FecthMyData;
