// const API_BASE_URL= "https://bt2cpjusui.us-east-2.awsapprunner.com/api/v1";
// const API_BASE_URL= "http://localhost:8000/api/v1";
// const API_BASE_URL= "http://localhost:8000";
const API_BASE_URL= "https://bt2cpjusui.us-east-2.awsapprunner.com";
export default async function fetchData(endpoint,{}){
  console.log(endpoint);
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return await response.json();
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
}