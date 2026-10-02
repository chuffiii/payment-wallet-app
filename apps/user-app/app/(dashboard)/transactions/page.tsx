import { getTransactions } from "../../../components/getTransactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="w-full p-8">
      <div className="text-4xl font-bold text-[#6a51a6] mb-8">
        Transactions
      </div>

      <div className="border rounded-lg bg-white">
        {transactions.length === 0 ? (
          <div className="p-6 text-slate-500">
            No transactions yet.
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between p-5 border-b last:border-b-0"
            >
              <div>
                <div className="font-medium">
                  {transaction.type}
                </div>
                <div className="text-sm text-slate-500">
                  {transaction.time.toDateString()}
                </div>
              </div>

              <div className="font-bold">
                INR {transaction.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}