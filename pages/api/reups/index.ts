import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { prisma } from "../../../server/db";
import {
  errorResponse,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
} from "../../../utils/response";
import { exceedsToday } from "../../../utils/date";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    if (!session) {
      return unauthorizedResponse(res);
    }

    switch (req.method) {
      case "GET":
        try {
          const reUps = await prisma.reUp.findMany({
            where: {
              user: session?.user.email,
            },
            orderBy: {
              date: "desc",
            },
          });
          return successResponse(res, reUps);
        } catch (error: any) {
          console.error(error);
          return errorResponse(
            res,
            error.message,
            "Internal Server Error",
            500
          );
        }
      case "POST":
        const { date, title, from, total, products, thoughts } = req.body;
        if (!date || !title || !from || !total || !products || !thoughts) {
          return errorResponse(res, "Missing required field in request body.");
        }
        if (total < 0) {
          return errorResponse(res, "Total must be greater than $0.");
        }
        if (exceedsToday(date)) {
          return errorResponse(res, "Date must be no later than today.");
        }
        // TODO: product check
        try {
          const reUp = await prisma.reUp.create({
            data: {
              date,
              title,
              from,
              total,
              thoughts,
              user: session.user.email,
            },
          });
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
      default:
        return methodNotAllowedResponse(res, ["GET", "POST"]);
    }
  }
);
