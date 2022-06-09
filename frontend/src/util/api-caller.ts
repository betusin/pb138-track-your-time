import { AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { unauthorizedText, unexpectedErrorText } from "../components/Messages";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../state/atom";

/**
 * A custom hook for app API calls. Includes automatic token
 * inclusion and error handling (which can be overridden).
 */
export function useApiCall(): ApiCaller {
  const token = useRecoilValue(accessTokenAtom);
  return <I, O>(
    a: ApiCall<I, O>,
    b: I,
    c: (x: O) => void,
    d?: (x: number) => boolean
  ) => {
    return doNetworkCall(a, b, c, d, token);
  };
}

/**
 * An API call autogenerated by Orval.
 */
export type ApiCall<I, A> = (
  input: I,
  options?: AxiosRequestConfig
) => Promise<AxiosResponse<A>>;

/**
 * The function to perform an API call
 * returned by useApiCall.
 */
export type ApiCaller = <I, O>(
  apiCall: ApiCall<I, O>,
  requestBody: I,
  onSuccess: (result: O) => void,
  onBadResponse?: (code: number) => boolean
) => void;

function doNetworkCall<I, A>(
  func: (input: I, options?: AxiosRequestConfig) => Promise<AxiosResponse<A>>,
  inputData: I,
  onSuccess: (result: A) => void,
  onBadResponse?: (code: number) => boolean,
  token?: string
) {
  let axiosOptions = undefined;
  if (token) {
    axiosOptions = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  }
  const call = func(inputData, axiosOptions);
  call
    .then((result) => onNetworkCallResult(result, onSuccess, onBadResponse))
    .catch(onUnhandledNetworkException);
}

function onNetworkCallResult<A>(
  result: AxiosResponse<A>,
  onSuccess: (result: A) => void,
  onBadResponse: ((code: number) => boolean) | undefined
) {
  if (result.status == 200 || result.status == 201) {
    // Everything is fine
    onSuccess(result.data);
    return;
  }
  if (onBadResponse !== undefined && onBadResponse(result.status)) {
    // Error, but it was handled
    return;
  }
  // Error, not handled
  onUnhandledNetworkCode(result);
}

function onUnhandledNetworkCode(result: AxiosResponse) {
  switch (result.status) {
    case 401:
      toast.error(unauthorizedText);
      break;
    default:
      toast.error(unexpectedErrorText);
      console.error(result);
      break;
  }
}

function onUnhandledNetworkException(e: Error) {
  toast.error(unexpectedErrorText);
  console.error(e);
}
