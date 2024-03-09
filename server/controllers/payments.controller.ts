import { RequestWithAuthenticatedStudent } from "../interface/auth.interface";
import { Request, Response } from "express";
import { OrderModel, PaymentModel, StudentModel, TutorModel } from "../models";
import logger from "../utils/logger";
import { isValidObjectId } from "mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export const orderForBookingTutor = async (
    req: RequestWithAuthenticatedStudent,
    res: Response
) => {
    try {
        const student = await StudentModel.findById(req.studentId);
        if (!student) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const { tutorId, language, price } = req.body;
        if (!isValidObjectId(tutorId)) {
            return res.status(403).json({ message: "Invalid tutor id" });
        }

        const tutor = await TutorModel.findOne({ _id: tutorId });
        if (!tutor) {
            return res.status(403).json({ message: "Tutor not found" });
        }

        const checkClass = await PaymentModel.findOne({ tutorId: tutorId, studentId: req.studentId, language: language });
        if (checkClass) {
            return res.status(403).json({ message: "You have already booked this session before" });
        }
        const checkValidity = tutor.languages.find((elem) => elem.language == language && elem.price == price);
        if (!checkValidity) {
            return res.status(403).json({ message: "Price and language not matched for the current tutor" });
        }
        const options = {
            amount: Number(price * 100),
            currency: "INR",
        };

        const order = await razorpayInstance.orders.create(options);
        if (!order) {
            return res.status(403).json({ message: "Failed to generate order" });
        }
        const orderModel = await OrderModel.create({
            studentId: student._id,
            tutorId: tutor._id,
            language: language,
            razorpayOrderId: order.id,
            price: price
        })
        await orderModel.save();
        return res.status(200).json({ data: order });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "orderForBookingTutor",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const paymentCallback = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const payloadBody = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(payloadBody.toString())
            .digest("hex");

        const isPaymentAuthentic = expectedSignature === razorpay_signature;
        if (!isPaymentAuthentic) {
            logger.error(
                JSON.stringify({
                    message: "Payment not authentic",
                    orderId: razorpay_order_id,
                    paymentId: razorpay_payment_id,
                    trace: "paymentCallback",
                })
            );
            return res.status(403).json({ message: "Payment is not authentic" });
        }
        const orderModel = await OrderModel.findOne({
            razorpayOrderId: razorpay_order_id,
        });
        if (!orderModel) {
            logger.error(
                JSON.stringify({
                    message: "Order not found for order id",
                    orderId: razorpay_order_id,
                    paymentId: razorpay_payment_id,
                    trace: "paymentCallback",
                })
            );
            return res.status(403).json({ message: "Order not found for the payment" });
        }

        const paymentModel = await PaymentModel.create({
            orderModelId: orderModel._id,
            razorpayPaymentId: razorpay_payment_id,
            tutorId: orderModel.tutorId,
            studentId: orderModel.studentId,
            language: orderModel.language
        });
        await paymentModel.save();

        return res.status(200).json({ message: "Payment successful" });
    } catch (err: any) {
        logger.error(
            JSON.stringify({
                message: "Internal server error: " + err,
                trace: "paymentCallback",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};
