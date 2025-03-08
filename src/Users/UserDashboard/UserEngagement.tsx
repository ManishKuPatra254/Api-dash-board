"use client";
// TODO: Add a tooltip to the chart
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import BillingAll from "../Billing/Billing";

const engagementData = [
  { month: "Jan", users: 300000 },
  { month: "Feb", users: 500000 },
  { month: "Mar", users: 650000 },
  { month: "Apr", users: 600000 },
  { month: "May", users: 550000 },
  { month: "Jun", users: 600000 },
  { month: "Jul", users: 650000 },
  { month: "Aug", users: 720000 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(210 100% 50%)", // Bright blue color
  },
} satisfies ChartConfig;

export default function UserEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
        <CardDescription>Annual user engagement via API</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute right-4 top-4">
            <select className="rounded-md border bg-background px-2 py-1 text-sm">
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={engagementData}
              margin={{
                top: 20,
                right: 50,
                left: 50,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `${(Number(value) / 1000).toFixed(0)}k`
                    }
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(210 100% 50%)"
                strokeWidth={2}
                dot={{
                  fill: "hsl(210 100% 50%)",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(210 100% 50%)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
      <BillingAll />
    </Card>
  );
}
