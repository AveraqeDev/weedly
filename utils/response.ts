import { NextApiResponse } from "next";

export const successResponse = (
  res: NextApiResponse,
  data: any,
  statusMessage: string = "Success",
  status: number = 200
) => {
  return res.status(status).json({ status: statusMessage, data: data });
};

export const errorResponse = (
  res: NextApiResponse,
  message: string,
  statusMessage: string = "Error",
  status: number = 400
) => {
  return res.status(status).json({ status: statusMessage, data: { message } });
};

export const unauthorizedResponse = (res: NextApiResponse) => {
  return res.status(403).json({
    status: "Unauthorized",
    data: { message: "You must be logged in to do that." },
  });
};

export const methodNotAllowedResponse = (
  res: NextApiResponse,
  allow: string[]
) => {
  res.setHeader("Allow", allow);
  return res.status(405).end();
};
