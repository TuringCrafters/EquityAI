import axios from "axios";

const fetchAnalysis = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/data`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export default fetchAnalysis;