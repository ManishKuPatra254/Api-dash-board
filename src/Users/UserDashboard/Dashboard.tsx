"use client";

import Layout from "@/Layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Download, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import UserEngagement from "./UserEngagement";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  cost: {
    label: "Cost",
    color: "hsl(var(--chart-3))",
  },
  line: {
    label: "Visitors",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function UserDashboard() {
  return (
    <div>
      <Layout>
        <div className="p-4 md:p-6 space-y-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Dashboard Analytics
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Track your performance and insights
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="text-xs" size="sm">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Card className="">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">
                      Total Users
                    </span>
                    <span className="text-2xl font-bold">2,543</span>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +12.5%
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">
                      Active Sessions
                    </span>
                    <span className="text-2xl font-bold">1,420</span>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +5.2%
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">
                      Avg. Session Time
                    </span>
                    <span className="text-2xl font-bold">4m 32s</span>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +8.4%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Data Sent/Received */}
            <Card>
              <CardHeader>
                <CardTitle>Line Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="desktop"
                      type="natural"
                      stroke="hsl(243 75% 59%)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>

            {/* Real-time customers */}
            <Card>
              <CardHeader>
                <CardTitle>Area Chart - Stacked</CardTitle>
                <CardDescription>
                  Showing total visitors for the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="hsl(346 77% 49%)"
                      fillOpacity={0.4}
                      stroke="hsl(346 77% 49%)"
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="hsl(199 89% 48%)"
                      fillOpacity={0.4}
                      stroke="hsl(199 89% 48%)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      January - June 2024
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="desktop" fill="hsl(45 93% 47%)" radius={8} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
          <UserEngagement />
        </div>
      </Layout>
    </div>
  );
}
