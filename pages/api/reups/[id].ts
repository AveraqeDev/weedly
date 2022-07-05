import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import {
  errorResponse,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
} from "../../../utils/response";
import { prisma } from "../../../server/db";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    if (!session) {
      return unauthorizedResponse(res);
    }
    const { id } = req.query;
    if (!id || Array.isArray(id) || parseInt(id) === NaN) {
      return errorResponse(res, "Invalid id provided.");
    }
    const parsedId = parseInt(id);
    switch (req.method) {
      case "GET":
        try {
          const reUp = await prisma.reUp.findUnique({
            where: {
              id: parsedId,
            },
          });

          if (!reUp) {
            return errorResponse(res, `ReUp with id '${id}' not found.`);
          }

          return successResponse(res, reUp);
        } catch (error: any) {
          console.error(error);
          return errorResponse(
            res,
            error.message,
            "Internal Server Error",
            500
          );
        }
      case "PUT":
        const { date, title, from, total, products, thoughts } = req.body;
        if (!date || !title || !from || !total || !products || !thoughts) {
          return errorResponse(
            res,
            "Missing required field(s) in request body."
          );
        }
        try {
          const reUp = await prisma.reUp.update({
            where: {
              id: parsedId,
            },
            data: {
              date,
              title,
              from,
              total,
              thoughts,
            },
          });
        } catch (error: any) {
          console.error(error);
          return errorResponse(
            res,
            error.message,
            "Internal Server Error",
            500
          );
        }
        return res.status(200).end();
      case "PATCH":
        if (!req.body) {
          return errorResponse(
            res,
            "Missing required field(s) in request body."
          );
        }
        try {
          const reUp = await prisma.reUp.update({
            where: {
              id: parsedId,
            },
            data: req.body,
          });
        } catch (error: any) {
          console.error(error);
          return errorResponse(
            res,
            error.message,
            "Internal Server Error",
            500
          );
        }
      case "DELETE":
        try {
          const reUp = await prisma.reUp.findUnique({
            where: { id: parsedId },
          });
          if (!reUp) {
            return errorResponse(res, `ReUp with id '${id}' not found.`);
          }
          if (!reUp.user === session.user.email) {
            return errorResponse(res, "You can only delete your own ReUps.");
          }
          await prisma.reUp.delete({ where: { id: parsedId } });
          return res.status(204).end();
        } catch (error: any) {
          console.error(error);
          return errorResponse(
            res,
            error.message,
            "Internal Server Error",
            500
          );
        }
      default:
        return methodNotAllowedResponse(res, ["GET", "PUT", "PATCH", "DELETE"]);
    }
  }
);
