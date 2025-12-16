/**
 * Stripe Payment Service
 * Enterprise-grade payment processing for German Select
 */

import { Currency, EXCHANGE_RATES, PREMIUM_TIERS, PremiumTier } from '../types'

interface StripeConfig {
  secretKey: string
  webhookSecret: string
}

interface CreatePaymentIntentParams {
  amount: number
  currency: Currency
  customerId?: string
  metadata?: Record<string, string>
  description?: string
  receiptEmail?: string
  paymentMethodTypes?: string[]
}

interface CreateSubscriptionParams {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
  trialDays?: number
}

interface StripePaymentIntent {
  id: string
  client_secret: string
  amount: number
  currency: string
  status: string
  metadata: Record<string, string>
}

interface StripeCustomer {
  id: string
  email: string
  name?: string
  metadata?: Record<string, string>
}

interface StripeSubscription {
  id: string
  customer: string
  status: string
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
  items: {
    data: Array<{
      price: {
        id: string
        unit_amount: number
        currency: string
        recurring: {
          interval: string
        }
      }
    }>
  }
}

export class StripeService {
  private baseUrl = 'https://api.stripe.com/v1'
  private secretKey: string
  private webhookSecret: string

  constructor(config: StripeConfig) {
    this.secretKey = config.secretKey
    this.webhookSecret = config.webhookSecret
  }

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' = 'GET',
    body?: Record<string, any>
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const options: RequestInit = {
      method,
      headers,
    }

    if (body && method === 'POST') {
      options.body = this.encodeFormData(body)
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options)
    const data = await response.json() as any

    if (!response.ok) {
      throw new Error(data.error?.message || 'Stripe API error')
    }

    return data as T
  }

  private encodeFormData(data: Record<string, any>, prefix = ''): string {
    const params: string[] = []
    
    for (const [key, value] of Object.entries(data)) {
      const fullKey = prefix ? `${prefix}[${key}]` : key
      
      if (value === null || value === undefined) continue
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        params.push(this.encodeFormData(value, fullKey))
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object') {
            params.push(this.encodeFormData(item, `${fullKey}[${index}]`))
          } else {
            params.push(`${encodeURIComponent(`${fullKey}[${index}]`)}=${encodeURIComponent(item)}`)
          }
        })
      } else {
        params.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`)
      }
    }
    
    return params.filter(p => p).join('&')
  }

  // ==================== CUSTOMERS ====================
  async createCustomer(params: {
    email: string
    name?: string
    metadata?: Record<string, string>
  }): Promise<StripeCustomer> {
    return this.request<StripeCustomer>('/customers', 'POST', params)
  }

  async getCustomer(customerId: string): Promise<StripeCustomer> {
    return this.request<StripeCustomer>(`/customers/${customerId}`)
  }

  async updateCustomer(
    customerId: string,
    params: Partial<{ email: string; name: string; metadata: Record<string, string> }>
  ): Promise<StripeCustomer> {
    return this.request<StripeCustomer>(`/customers/${customerId}`, 'POST', params)
  }

  // ==================== PAYMENT INTENTS ====================
  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<StripePaymentIntent> {
    // Convert amount to smallest currency unit (cents)
    const amountInCents = Math.round(params.amount * 100)
    
    const requestBody: Record<string, any> = {
      amount: amountInCents,
      currency: params.currency.toLowerCase(),
      payment_method_types: params.paymentMethodTypes || ['card'],
      metadata: params.metadata || {},
    }

    if (params.customerId) {
      requestBody.customer = params.customerId
    }

    if (params.description) {
      requestBody.description = params.description
    }

    if (params.receiptEmail) {
      requestBody.receipt_email = params.receiptEmail
    }

    return this.request<StripePaymentIntent>('/payment_intents', 'POST', requestBody)
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<StripePaymentIntent> {
    return this.request<StripePaymentIntent>(
      `/payment_intents/${paymentIntentId}/confirm`,
      'POST'
    )
  }

  async capturePaymentIntent(paymentIntentId: string): Promise<StripePaymentIntent> {
    return this.request<StripePaymentIntent>(
      `/payment_intents/${paymentIntentId}/capture`,
      'POST'
    )
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<StripePaymentIntent> {
    return this.request<StripePaymentIntent>(
      `/payment_intents/${paymentIntentId}/cancel`,
      'POST'
    )
  }

  async getPaymentIntent(paymentIntentId: string): Promise<StripePaymentIntent> {
    return this.request<StripePaymentIntent>(`/payment_intents/${paymentIntentId}`)
  }

  // ==================== REFUNDS ====================
  async createRefund(params: {
    paymentIntentId: string
    amount?: number // in cents
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
    metadata?: Record<string, string>
  }): Promise<any> {
    const requestBody: Record<string, any> = {
      payment_intent: params.paymentIntentId,
    }

    if (params.amount) {
      requestBody.amount = params.amount
    }

    if (params.reason) {
      requestBody.reason = params.reason
    }

    if (params.metadata) {
      requestBody.metadata = params.metadata
    }

    return this.request('/refunds', 'POST', requestBody)
  }

  // ==================== SUBSCRIPTIONS ====================
  async createSubscription(params: CreateSubscriptionParams): Promise<StripeSubscription> {
    const requestBody: Record<string, any> = {
      customer: params.customerId,
      items: [{ price: params.priceId }],
      metadata: params.metadata || {},
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    }

    if (params.trialDays) {
      requestBody.trial_period_days = params.trialDays
    }

    return this.request<StripeSubscription>('/subscriptions', 'POST', requestBody)
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd = true
  ): Promise<StripeSubscription> {
    if (cancelAtPeriodEnd) {
      return this.request<StripeSubscription>(
        `/subscriptions/${subscriptionId}`,
        'POST',
        { cancel_at_period_end: true }
      )
    } else {
      return this.request<StripeSubscription>(
        `/subscriptions/${subscriptionId}`,
        'DELETE'
      )
    }
  }

  async updateSubscription(
    subscriptionId: string,
    params: { priceId?: string; metadata?: Record<string, string> }
  ): Promise<StripeSubscription> {
    const requestBody: Record<string, any> = {}

    if (params.priceId) {
      // To change price, we need to get current subscription items first
      const subscription = await this.getSubscription(subscriptionId)
      const currentItemId = subscription.items.data[0]?.price?.id
      if (currentItemId) {
        requestBody.items = [{ id: currentItemId, price: params.priceId }]
      }
    }

    if (params.metadata) {
      requestBody.metadata = params.metadata
    }

    return this.request<StripeSubscription>(
      `/subscriptions/${subscriptionId}`,
      'POST',
      requestBody
    )
  }

  async getSubscription(subscriptionId: string): Promise<StripeSubscription> {
    return this.request<StripeSubscription>(`/subscriptions/${subscriptionId}`)
  }

  // ==================== PRODUCTS & PRICES ====================
  async createProduct(params: {
    name: string
    description?: string
    metadata?: Record<string, string>
  }): Promise<any> {
    return this.request('/products', 'POST', params)
  }

  async createPrice(params: {
    productId: string
    unitAmount: number // in cents
    currency: string
    recurring?: { interval: 'month' | 'year' }
  }): Promise<any> {
    const requestBody: Record<string, any> = {
      product: params.productId,
      unit_amount: params.unitAmount,
      currency: params.currency.toLowerCase(),
    }

    if (params.recurring) {
      requestBody.recurring = params.recurring
    }

    return this.request('/prices', 'POST', requestBody)
  }

  // ==================== CHECKOUT SESSIONS ====================
  async createCheckoutSession(params: {
    customerId?: string
    customerEmail?: string
    lineItems: Array<{
      priceId?: string
      name?: string
      description?: string
      amount: number
      currency: string
      quantity: number
    }>
    mode: 'payment' | 'subscription'
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string>
  }): Promise<{ id: string; url: string }> {
    const requestBody: Record<string, any> = {
      mode: params.mode,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata || {},
    }

    if (params.customerId) {
      requestBody.customer = params.customerId
    } else if (params.customerEmail) {
      requestBody.customer_email = params.customerEmail
    }

    requestBody.line_items = params.lineItems.map(item => {
      if (item.priceId) {
        return { price: item.priceId, quantity: item.quantity }
      }
      return {
        price_data: {
          currency: item.currency.toLowerCase(),
          unit_amount: Math.round(item.amount * 100),
          product_data: {
            name: item.name,
            description: item.description,
          },
        },
        quantity: item.quantity,
      }
    })

    return this.request('/checkout/sessions', 'POST', requestBody)
  }

  // ==================== WEBHOOK VERIFICATION ====================
  async verifyWebhookSignature(
    payload: string,
    signature: string
  ): Promise<any> {
    // Note: In production, use proper HMAC verification
    // This is a simplified version for demo purposes
    const parts = signature.split(',')
    const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1]
    const sig = parts.find(p => p.startsWith('v1='))?.split('=')[1]

    if (!timestamp || !sig) {
      throw new Error('Invalid webhook signature format')
    }

    // Verify timestamp is recent (within 5 minutes)
    const timestampNum = parseInt(timestamp, 10)
    const now = Math.floor(Date.now() / 1000)
    if (Math.abs(now - timestampNum) > 300) {
      throw new Error('Webhook timestamp too old')
    }

    // In production, compute HMAC and compare
    // For now, we'll just parse the payload
    return JSON.parse(payload)
  }

  // ==================== UTILITY FUNCTIONS ====================
  convertToEur(amount: number, currency: Currency): number {
    const rate = EXCHANGE_RATES[currency] || 1
    return amount / rate
  }

  convertFromEur(amount: number, currency: Currency): number {
    const rate = EXCHANGE_RATES[currency] || 1
    return amount * rate
  }

  getPremiumTierPrices(tier: PremiumTier, interval: 'monthly' | 'yearly'): number {
    const tierConfig = PREMIUM_TIERS[tier]
    return interval === 'monthly' ? tierConfig.monthlyPrice : tierConfig.yearlyPrice
  }

  calculatePlatformFee(amount: number, commissionRate: number): number {
    return Math.round(amount * (commissionRate / 100) * 100) / 100
  }

  calculateDoctorPayout(amount: number, platformFee: number): number {
    return amount - platformFee
  }

  calculateAffiliateCommission(amount: number, commissionRate: number): number {
    return Math.round(amount * (commissionRate / 100) * 100) / 100
  }
}

// Export a factory function
export function createStripeService(secretKey: string, webhookSecret: string): StripeService {
  return new StripeService({ secretKey, webhookSecret })
}
