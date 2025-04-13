"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TimeRange = "7d" | "30d" | "90d" | "all";

export interface AreaChartData {
  date: string;
  [key: string]: string | number;
}

interface AreaChartProps {
  title: string;
  description: string;
  data: AreaChartData[];
  config: ChartConfig;
  dateRange?: {
    referenceDate?: string;
    defaultRange?: TimeRange;
  };
  className?: string;
  height?: number;
}

export function AreaChartComponent({
  title,
  description,
  data,
  config,
  dateRange = {},
  className = "",
  height = 250,
}: AreaChartProps) {
  const {
    referenceDate = new Date().toISOString().split("T")[0],
    defaultRange = "90d",
  } = dateRange;

  const [timeRange, setTimeRange] = React.useState<TimeRange>(defaultRange);

  const filteredData = React.useMemo(() => {
    if (timeRange === "all") return data;

    const daysToSubtract = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
    }[timeRange];

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return data.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [data, timeRange, referenceDate]);

  const availableTimeRanges = React.useMemo(() => {
    const ranges: { value: TimeRange; label: string }[] = [
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "90d", label: "Last 3 months" },
    ];

    // Only show "All time" option if there's data beyond 90 days
    if (data.length > 0) {
      const firstDate = new Date(data[0].date);
      const refDate = new Date(referenceDate);
      const diffTime = refDate.getTime() - firstDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays > 90) {
        ranges.push({ value: "all", label: "All time" });
      }
    }

    return ranges;
  }, [data, referenceDate]);

  const dataKeys = React.useMemo(() => {
    return Object.keys(data[0] || {}).filter((key) => key !== "date");
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="flex  items-center gap-5  border-b py-5 sm:flex-row md:flex-row  flex-col">
        <div className="grid flex-1 gap-1 text-center sm:text-left ">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {availableTimeRanges.length > 1 && (
          <Select
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select time range"
            >
              <SelectValue
                placeholder={`Last ${
                  defaultRange === "all"
                    ? "3 months"
                    : {
                        "7d": "7 days",
                        "30d": "30 days",
                        "90d": "3 months",
                      }[defaultRange]
                }`}
              />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {availableTimeRanges.map((range) => (
                <SelectItem
                  key={range.value}
                  value={range.value}
                  className="rounded-lg"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={config}
          className="aspect-auto w-full"
          style={{ height: `${height}px` }}
        >
          <AreaChart data={filteredData}>
            <defs>
              {dataKeys.map((key) => (
                <linearGradient
                  key={`fill-${key}`}
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: timeRange === "all" ? "numeric" : undefined,
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {dataKeys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill-${key})`}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
