import { useLocation, useParams } from "react-router-dom";

export const usePageParams = (
  queryParamsKey: string,
  pathParamsKey: string,
) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParam: string | null = queryParams.get(queryParamsKey);

  const result = useParams();
  const pathParam = result[`${pathParamsKey}`];

  return {
    queryParam,
    pathParam,
  };
};
