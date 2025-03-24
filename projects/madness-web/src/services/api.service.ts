import axios from "axios";
import { createTypedReactSDK } from "create-typed-react-sdk";
import { DoFetch } from "create-typed-sdk";
import { config } from "madness-shared";
import { api } from "madness-server";

const doFetch: DoFetch = async (p) => {
  console.log("+++++++ 000 ++++++++++", "RjLLsRzds4");
  const path = p.path.join("/");
  const url = `${config.API_ROOT_URL}/api/${path}`;
  console.log(path, "59VjeuZNz3");
  console.log(url, "uJrwCx5Eo4");

  try {
    const response = await axios.post(
      url,
      {
        payload: p.arg,
      },
      {
        timeout: 1000 * 30,
      }
    );

    return response.data;
  } catch (e) {
    throw new Error("Error calling server fn");
  }
};
export const { SDK, SDKProvider, getQueryKey, usePaginatedSDK, useSDK } =
  createTypedReactSDK<typeof api>({
    doFetch,
    refetchOnMount: "always",
  });
