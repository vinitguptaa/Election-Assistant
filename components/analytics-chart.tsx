"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsChart({ data }: { data: Array<{ party: string; year: number; seats: number; voteShare: number }> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous election performance</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="party" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="seats" fill="#0f4c81" name="Seats" />
            <Bar dataKey="voteShare" fill="#16a34a" name="Vote share" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
