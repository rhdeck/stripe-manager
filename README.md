
<a name="readmemd"></a>

Template for making easy-to-work-with tempates

# stripe-manager

<a name="_librarymd"></a>

[@raydeck/stripe-manager - v1.0.2](#readmemd)

# @raydeck/stripe-manager - v1.0.2

## Index

### Interfaces

* [EMStripeEvent](#interfacesemstripeeventmd)

### Type aliases

* [StripeEventType](#stripeeventtype)

### Functions

* [addStripeListener](#addstripelistener)
* [withStripeWebhook](#withstripewebhook)

## Type aliases

###  StripeEventType

Ƭ **StripeEventType**: *"account.updated" | "account.external_account.created" | "account.external_account.deleted" | "account.external_account.updated" | "balance.available" | "capability.updated" | "charge.captured" | "charge.expired" | "charge.failed" | "charge.pending" | "charge.refunded" | "charge.succeeded" | "charge.updated" | "charge.dispute.closed" | "charge.dispute.created" | "charge.dispute.funds_reinstated" | "charge.dispute.funds_withdrawn" | "charge.dispute.updated" | "charge.refund.updated" | "checkout.session.async_payment_failed" | "checkout.session.async_payment_succeeded" | "checkout.session.completed" | "coupon.created" | "coupon.deleted" | "coupon.updated" | "credit_note.created" | "credit_note.updated" | "credit_note.voided" | "customer.created" | "customer.deleted" | "customer.updated" | "customer.discount.created" | "customer.discount.deleted" | "customer.discount.updated" | "customer.source.created" | "customer.source.deleted" | "customer.source.expiring" | "customer.source.updated" | "customer.subscription.created" | "customer.subscription.deleted" | "customer.subscription.pending_update_applied" | "customer.subscription.pending_update_expired" | "customer.subscription.trial_will_end" | "customer.subscription.updated" | "customer.tax_id.created" | "customer.tax_id.deleted" | "customer.tax_id.updated" | "file.created" | "invoice.created" | "invoice.deleted" | "invoice.finalized" | "invoice.marked_uncollectible" | "invoice.paid" | "invoice.payment_action_required" | "invoice.payment_failed" | "invoice.payment_succeeded" | "invoice.sent" | "invoice.upcoming" | "invoice.updated" | "invoice.voided" | "invoiceitem.created" | "invoiceitem.deleted" | "invoiceitem.updated" | "issuing_authorization.created" | "issuing_authorization.updated" | "issuing_card.created" | "issuing_card.updated" | "issuing_cardholder.created" | "issuing_cardholder.updated" | "issuing_dispute.closed" | "issuing_dispute.created" | "issuing_dispute.funds_reinstated" | "issuing_dispute.submitted" | "issuing_dispute.updated" | "issuing_transaction.created" | "issuing_transaction.updated" | "mandate.updated" | "order.created" | "order.payment_failed" | "order.payment_succeeded" | "order.updated" | "order_return.created" | "payment_intent.amount_capturable_updated" | "payment_intent.canceled" | "payment_intent.created" | "payment_intent.payment_failed" | "payment_intent.processing" | "payment_intent.requires_action" | "payment_intent.succeeded" | "payment_method.attached" | "payment_method.automatically_updated" | "payment_method.detached" | "payment_method.updated" | "payout.canceled" | "payout.created" | "payout.failed" | "payout.paid" | "payout.updated" | "person.created" | "person.deleted" | "person.updated" | "plan.created" | "plan.deleted" | "plan.updated" | "price.created" | "price.deleted" | "price.updated" | "product.created" | "product.deleted" | "product.updated" | "promotion_code.created" | "promotion_code.updated" | "radar.early_fraud_warning.created" | "radar.early_fraud_warning.updated" | "recipient.created" | "recipient.deleted" | "recipient.updated" | "reporting.report_run.failed" | "reporting.report_run.succeeded" | "review.closed" | "review.opened" | "setup_intent.canceled" | "setup_intent.created" | "setup_intent.setup_failed" | "setup_intent.succeeded" | "sigma.scheduled_query_run.created" | "sku.created" | "sku.deleted" | "sku.updated" | "source.canceled" | "source.chargeable" | "source.failed" | "source.mandate_notification" | "source.refund_attributes_required" | "source.transaction.created" | "source.transaction.updated" | "subscription_schedule.aborted" | "subscription_schedule.canceled" | "subscription_schedule.completed" | "subscription_schedule.created" | "subscription_schedule.expiring" | "subscription_schedule.released" | "subscription_schedule.updated" | "tax_rate.created" | "tax_rate.updated" | "topup.canceled" | "topup.created" | "topup.failed" | "topup.reversed" | "topup.succeeded" | "transfer.created" | "transfer.failed" | "transfer.paid" | "transfer.reversed" | "transfer.updated"*

*Defined in [src/index.ts:5](https://github.com/rhdeck/stripe-manager/blob/37401ad/src/index.ts#L5)*

## Functions

###  addStripeListener

▸ **addStripeListener**(`typeOrTypes`: [StripeEventType](#stripeeventtype) | [StripeEventType](#stripeeventtype)[], `f`: function): *function*

*Defined in [src/index.ts:199](https://github.com/rhdeck/stripe-manager/blob/37401ad/src/index.ts#L199)*

**Parameters:**

▪ **typeOrTypes**: *[StripeEventType](#stripeeventtype) | [StripeEventType](#stripeeventtype)[]*

▪ **f**: *function*

▸ (`event`: [EMStripeEvent](#interfacesemstripeeventmd)): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [EMStripeEvent](#interfacesemstripeeventmd) |

**Returns:** *function*

▸ (): *void*

___

###  withStripeWebhook

▸ **withStripeWebhook**(`stripe`: Stripe, `webhookSecret`: string, `f?`: undefined | function): *Handler‹APIGatewayProxyEvent, APIGatewayProxyResult›*

*Defined in [src/index.ts:161](https://github.com/rhdeck/stripe-manager/blob/37401ad/src/index.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`stripe` | Stripe |
`webhookSecret` | string |
`f?` | undefined &#124; function |

**Returns:** *Handler‹APIGatewayProxyEvent, APIGatewayProxyResult›*


<a name="interfacesemstripeeventmd"></a>

[@raydeck/stripe-manager - v1.0.2](#readmemd) › [EMStripeEvent](#interfacesemstripeeventmd)

# Interface: EMStripeEvent

## Hierarchy

* **EMStripeEvent**

## Index

### Properties

* [event](#event)
* [stripe](#stripe)
* [type](#type)

## Properties

###  event

• **event**: *Event*

*Defined in [src/index.ts:197](https://github.com/rhdeck/stripe-manager/blob/37401ad/src/index.ts#L197)*

___

###  stripe

• **stripe**: *Stripe*

*Defined in [src/index.ts:196](https://github.com/rhdeck/stripe-manager/blob/37401ad/src/index.ts#L196)*

___

###  type

• **type**: *[StripeEventType](#stripeeventtype)*

*Defined in [src/index.ts:195](https://github.com/rhdeck/stripe-manager/blob/37401ad/src/index.ts#L195)*
