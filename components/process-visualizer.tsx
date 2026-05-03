"use client";

import { motion } from "framer-motion";
import { BadgeCheck, BarChart3, Scale, UserPlus, Vote } from "lucide-react";
import { processSteps } from "@/lib/mock-data";

const icons = { UserPlus, BadgeCheck, Scale, Vote, BarChart3 };

export function ProcessVisualizer() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {processSteps.map((step, index) => {
        const Icon = icons[step.icon as keyof typeof icons] ?? BadgeCheck;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            className="rounded-lg border bg-card p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-semibold">{step.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.detail}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
