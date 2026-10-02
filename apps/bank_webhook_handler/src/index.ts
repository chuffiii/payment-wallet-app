import express from "express";
import { prisma } from "@repo/db"
const app = express();

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("webhook is working")
})

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await prisma.$transaction([
            prisma.balance.upsert({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                update: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                },
                create : {
                    userId : Number(paymentInformation.userId),
                    amount : Number(paymentInformation.amount),
                    locked : 0
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            }),
        ]);

        res.json({
            message: "operation completed"
        })

    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);