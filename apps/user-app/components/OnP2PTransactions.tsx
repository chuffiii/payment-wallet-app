import { Card } from "@repo/ui/card";

export const OnP2PTransactions = ({
    transactions
}:{
    transactions:{
        time: Date,
        amount : number
    }[]
}) => 
    {
        if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - {t.amount / 100} INR
                </div>

            </div>)}
        </div>
    </Card>
}