import { Fragment } from "react";
import Layout from "@/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Copy, CreditCard } from "lucide-react";

export default function BillingAll() {
  return (
    <Fragment>
      <Layout>
        <div className="flex flex-col gap-8">
          {/* Payment Method Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p className="text-gray-500 text-sm mb-4">
              Manage your preferred payment methods effortlessly.
            </p>

            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12">
                  <img src="/visa-logo.png" alt="Visa" className="w-full" />
                </div>
                <div>
                  <p className="font-medium">Visa **** 9921</p>
                  <p className="text-sm text-gray-500">Expires on 09/25</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline">Manage</Button>
                <Button variant="outline">Add Payment Method</Button>
                <Button>Add Payment</Button>
              </div>
            </div>
          </section>

          {/* Plans Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              Choose a Plan That Fits Your Needs
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Upgrade or modify your plan anytime to match your evolving
              requirements.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-6 h-6" />
                  <span className="font-semibold">Free Plan</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold">$0</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Start with the basics and experience LostBag at no cost.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm">Includes:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Essential event management tools</li>
                    <li>• Basic analytics & reporting</li>
                    <li>• Up to 3 events per month</li>
                    <li>• Community Support</li>
                  </ul>
                </div>
                <Button className="w-full" variant="secondary">
                  Active
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-6 h-6" />
                  <span className="font-semibold">Pro Plan</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold">$299.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Unlock advanced tools and premium support for seamless event
                  management.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm">Includes Free plan, plus:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Unlimited events</li>
                    <li>• AI-powered insights & recommendations</li>
                    <li>• Advanced budget tracking</li>
                    <li>• Priority support</li>
                    <li>• Team collaboration tools</li>
                  </ul>
                </div>
                <Button className="w-full">Change Plan</Button>
              </div>

              {/* Enterprise Plan */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-6 h-6" />
                  <span className="font-semibold">Enterprise</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold">$500</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  For teams that need custom solutions and dedicated support.
                  Contact us for more info.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm">Includes Pro plan, plus:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Custom integrations</li>
                    <li>• Dedicated account manager</li>
                    <li>• Advanced security & compliance</li>
                    <li>• API access for automation</li>
                    <li>• VIP onboarding & training</li>
                  </ul>
                </div>
                <Button className="w-full">Contact Us</Button>
              </div>
            </div>
          </section>

          {/* Billing History Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Billing History</h2>
            <p className="text-gray-500 text-sm mb-6">
              Download past invoices, and track your subscription status with
              ease.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-4">No</th>
                    <th className="pb-4">Invoice</th>
                    <th className="pb-4">Billing Date</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Plan</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">1.</td>
                    <td className="py-4 flex items-center gap-2">
                      <Copy className="w-4 h-4" />
                      Invoice #8919-9922
                    </td>
                    <td className="py-4">17 Feb, 2025, 12:00</td>
                    <td className="py-4">$299.99</td>
                    <td className="py-4">Pro Plan</td>
                    <td className="py-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        Paid
                      </span>
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Layout>
    </Fragment>
  );
}
