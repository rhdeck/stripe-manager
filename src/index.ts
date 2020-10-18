import Stripe from "stripe";
import { addListener, trigger } from "@raydeck/event-manager";
import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { withSession } from "@raydeck/session-manager";
export type StripeEventType =
  | "account.updated"
  | "account.external_account.created"
  | "account.external_account.deleted"
  | "account.external_account.updated"
  | "balance.available"
  | "capability.updated"
  | "charge.captured"
  | "charge.expired"
  | "charge.failed"
  | "charge.pending"
  | "charge.refunded"
  | "charge.succeeded"
  | "charge.updated"
  | "charge.dispute.closed"
  | "charge.dispute.created"
  | "charge.dispute.funds_reinstated"
  | "charge.dispute.funds_withdrawn"
  | "charge.dispute.updated"
  | "charge.refund.updated"
  | "checkout.session.async_payment_failed"
  | "checkout.session.async_payment_succeeded"
  | "checkout.session.completed"
  | "coupon.created"
  | "coupon.deleted"
  | "coupon.updated"
  | "credit_note.created"
  | "credit_note.updated"
  | "credit_note.voided"
  | "customer.created"
  | "customer.deleted"
  | "customer.updated"
  | "customer.discount.created"
  | "customer.discount.deleted"
  | "customer.discount.updated"
  | "customer.source.created"
  | "customer.source.deleted"
  | "customer.source.expiring"
  | "customer.source.updated"
  | "customer.subscription.created"
  | "customer.subscription.deleted"
  | "customer.subscription.pending_update_applied"
  | "customer.subscription.pending_update_expired"
  | "customer.subscription.trial_will_end"
  | "customer.subscription.updated"
  | "customer.tax_id.created"
  | "customer.tax_id.deleted"
  | "customer.tax_id.updated"
  | "file.created"
  | "invoice.created"
  | "invoice.deleted"
  | "invoice.finalized"
  | "invoice.marked_uncollectible"
  | "invoice.paid"
  | "invoice.payment_action_required"
  | "invoice.payment_failed"
  | "invoice.payment_succeeded"
  | "invoice.sent"
  | "invoice.upcoming"
  | "invoice.updated"
  | "invoice.voided"
  | "invoiceitem.created"
  | "invoiceitem.deleted"
  | "invoiceitem.updated"
  | "issuing_authorization.created"
  | "issuing_authorization.updated"
  | "issuing_card.created"
  | "issuing_card.updated"
  | "issuing_cardholder.created"
  | "issuing_cardholder.updated"
  | "issuing_dispute.closed"
  | "issuing_dispute.created"
  | "issuing_dispute.funds_reinstated"
  | "issuing_dispute.submitted"
  | "issuing_dispute.updated"
  | "issuing_transaction.created"
  | "issuing_transaction.updated"
  | "mandate.updated"
  | "order.created"
  | "order.payment_failed"
  | "order.payment_succeeded"
  | "order.updated"
  | "order_return.created"
  | "payment_intent.amount_capturable_updated"
  | "payment_intent.canceled"
  | "payment_intent.created"
  | "payment_intent.payment_failed"
  | "payment_intent.processing"
  | "payment_intent.requires_action"
  | "payment_intent.succeeded"
  | "payment_method.attached"
  | "payment_method.automatically_updated"
  | "payment_method.detached"
  | "payment_method.updated"
  | "payout.canceled"
  | "payout.created"
  | "payout.failed"
  | "payout.paid"
  | "payout.updated"
  | "person.created"
  | "person.deleted"
  | "person.updated"
  | "plan.created"
  | "plan.deleted"
  | "plan.updated"
  | "price.created"
  | "price.deleted"
  | "price.updated"
  | "product.created"
  | "product.deleted"
  | "product.updated"
  | "promotion_code.created"
  | "promotion_code.updated"
  | "radar.early_fraud_warning.created"
  | "radar.early_fraud_warning.updated"
  | "recipient.created"
  | "recipient.deleted"
  | "recipient.updated"
  | "reporting.report_run.failed"
  | "reporting.report_run.succeeded"
  | "review.closed"
  | "review.opened"
  | "setup_intent.canceled"
  | "setup_intent.created"
  | "setup_intent.setup_failed"
  | "setup_intent.succeeded"
  | "sigma.scheduled_query_run.created"
  | "sku.created"
  | "sku.deleted"
  | "sku.updated"
  | "source.canceled"
  | "source.chargeable"
  | "source.failed"
  | "source.mandate_notification"
  | "source.refund_attributes_required"
  | "source.transaction.created"
  | "source.transaction.updated"
  | "subscription_schedule.aborted"
  | "subscription_schedule.canceled"
  | "subscription_schedule.completed"
  | "subscription_schedule.created"
  | "subscription_schedule.expiring"
  | "subscription_schedule.released"
  | "subscription_schedule.updated"
  | "tax_rate.created"
  | "tax_rate.updated"
  | "topup.canceled"
  | "topup.created"
  | "topup.failed"
  | "topup.reversed"
  | "topup.succeeded"
  | "transfer.created"
  | "transfer.failed"
  | "transfer.paid"
  | "transfer.reversed"
  | "transfer.updated";
export function withStripeWebhook(
  stripe: Stripe,
  webhookSecret: string,
  f?: (event: { stripe: Stripe; event: Stripe.Event }) => Promise<void>
) {
  return <APIGatewayProxyHandler>(
    withSession(async (event2: APIGatewayProxyEvent) => {
      const {
        body,
        headers: { ["Stripe-Signature"]: signature },
      } = event2;
      if (!signature) return { statusCode: 400 };
      if (!body) throw new Error("Body not passed");

      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
      try {
        if (f) await f({ stripe, event });
        trigger("stripe." + <StripeEventType>event.type, <EMStripeEvent>{
          type: <StripeEventType>event.type,
          stripe,
          event,
        });
      } catch (e) {
        console.error(e);
      }
      return { statusCode: 200 };
    })
  );
}
export interface EMStripeEvent {
  type: StripeEventType;
  stripe: Stripe;
  event: Stripe.Event;
}
export function addStripeListener(
  typeOrTypes: StripeEventType | StripeEventType[],
  f: (event: EMStripeEvent) => Promise<void>
) {
  if (typeof typeOrTypes === "string") {
    return addListener(
      "stripe." + typeOrTypes,
      <(options: { [key: string]: any }) => Promise<void>>f
    );
  } else {
    const removes = typeOrTypes.map((type) =>
      addListener(
        "stripe." + type,
        <(options: { [key: string]: any }) => Promise<void>>f
      )
    );
    return () => removes.forEach((remove) => remove());
  }
}
