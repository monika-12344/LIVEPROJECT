import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
const stripe = new Stripe("");

export const stripeController = async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
    });

    // Generate onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:3000/reauth",
      return_url: "http://localhost:3000/success",
      type: "account_onboarding",
    });

    res.json({ url: accountLink.url });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message, success: false, data: {} });
  }
};
