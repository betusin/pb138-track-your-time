import { useParams } from "react-router";

export function useParamOrEmpty(param: string): string {
  return useParams()[param] ?? "";
}
