import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export async function getTransactions() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  const userId = Number(session.user.id);

  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: userId,
    },
  });

  const p2pTransactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId },
      ],
    },
  });

  const transactions = [
    ...onRampTransactions.map((transaction) => ({
      id: `onramp-${transaction.id}`,
      type: "Money Added",
      amount: transaction.amount/100,
      time: transaction.startTime,
    })),

    ...p2pTransactions.map((transaction) => ({
      id: `p2p-${transaction.id}`,
      type:
        transaction.fromUserId === userId
          ? "Money Transfer"
          : "Money Received",
      amount:
        transaction.fromUserId === userId
          ? -transaction.amount/100
          : transaction.amount/100,
      time: transaction.timestamp,
    })),
  ];

  transactions.sort(
    (a, b) => b.time.getTime() - a.time.getTime()
  );

  return transactions;
}