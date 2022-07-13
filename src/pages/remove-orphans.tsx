import {
  CheckCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import Button from "../components/Button";
import { classNames } from "../utils/string";
import { trpc } from "../utils/trpc";

type Data = {
  status: string;
  message: unknown;
};

const Alert: React.FC<{
  data: Data | null;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
}> = ({ data, setData }) => {
  const isSuccess = data?.status === "success";
  return (
    <div
      className={classNames(
        isSuccess ? "bg-green-50" : "bg-red-50",
        "rounded-md p-4"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isSuccess ? (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <h3
            className={classNames(
              isSuccess ? "text-green-800" : "text-red-800",
              "text-sm font-medium"
            )}
          >
            {isSuccess ? "Success" : "Error"}
          </h3>
          <div
            className={classNames(
              isSuccess ? "text-green-700" : "text-red-700",
              "mt-2 text-sm"
            )}
          >
            <p>{`${data?.message}`}</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className={classNames(
                  isSuccess
                    ? "bg-green-50 text-green-800 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600"
                    : "bg-red-50 text-red-800 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600",
                  "px-2 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                )}
                onClick={() => setData(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RemoveOrphans = () => {
  const [data, setData] = useState<Data | null>(null);
  const { mutate, isLoading } = trpc.useMutation("reups.remove-orphans", {
    onSuccess(data) {
      setData(data);
    },
  });

  return (
    <>
      {data && <Alert data={data} setData={setData} />}
      <div className="flex flex-col items-center justify-center w-full h-96 overflow-hidden gap-2">
        <h1 className="text-2xl text-gray-900 font-bold">
          Remove Orphaned Entities?
        </h1>
        <Button onClick={() => mutate()} disabled={isLoading} type="button">
          <MinusCircleIcon className="h-5 w-5 text-white group-hover:text-gray-500 group-disabled:text-gray-400" />
          <span>Do It</span>
        </Button>
      </div>
    </>
  );
};

export default RemoveOrphans;
