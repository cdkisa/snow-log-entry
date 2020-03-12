import * as React from "react";

export default (apiMethod: Function, args?: any) => {
  const [loading, setLoading] = React.useState(true);
  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiMethod(args);
        setResponse(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [apiMethod, args]);
  return { loading, response, error };
};
