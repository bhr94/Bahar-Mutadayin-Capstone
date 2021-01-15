const backend_url =
  process.env.NODE_ENV === "production"
    ? "https://evening-gorge-97906.herokuapp.com"
    : "http://localhost:8080";
export default backend_url;
