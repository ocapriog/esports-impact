"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const inputLabels = {
  local: "Local Attendees",
  outOfTown: "Out-of-Town Attendees",
  days: "Event Duration (Days)",
  ticket: "Avg Spend on Tickets",
  lodging: "Avg Spend on Lodging",
  food: "Avg Spend on Food & Beverage",
  transport: "Avg Spend on Transportation",
  merch: "Avg Spend on Merchandise",
  venue: "Organizer: Venue Rental",
  wages: "Organizer: Staff Wages",
  tech: "Organizer: Equipment/Tech",
  marketing: "Organizer: Marketing",
  prizes: "Organizer: Prize Pool",
};

export default function EsportsImpactTool() {
  const [inputs, setInputs] = useState({
    local: 200,
    outOfTown: 300,
    days: 3,
    ticket: 25,
    lodging: 150,
    food: 90,
    transport: 50,
    merch: 40,
    venue: 20000,
    wages: 15000,
    tech: 25000,
    marketing: 10000,
    prizes: 5000,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const calculate = () => {
    const visitorLocal = inputs.local * (inputs.ticket + inputs.food + inputs.transport + inputs.merch);
    const visitorOOT = inputs.outOfTown * (inputs.ticket + inputs.lodging + inputs.food + inputs.transport + inputs.merch);
    const totalVisitor = visitorLocal + visitorOOT;
    const organizer = inputs.venue + inputs.wages + inputs.tech + inputs.marketing + inputs.prizes;
    const direct = totalVisitor + organizer;
    const indirect = direct * 0.6;
    const induced = direct * 0.4;
    const total = direct + indirect + induced;

    setResult({ totalVisitor, organizer, direct, indirect, induced, total });
  };

  return (
    <div className="grid gap-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Esports Economic Impact Tool</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(inputs).map(([key, val]) => (
          <div key={key} className="flex flex-col gap-1">
            <Label htmlFor={key}>{inputLabels[key]}</Label>
            <Input
              id={key}
              name={key}
              type="number"
              value={val}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <Button onClick={calculate} className="w-fit">Calculate Impact</Button>

      {result && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <ul className="space-y-2 text-lg">
              <li>🎟️ Visitor Spending: ${result.totalVisitor.toLocaleString()}</li>
              <li>🏢 Organizer Spending: ${result.organizer.toLocaleString()}</li>
              <li>💰 Direct Impact: ${result.direct.toLocaleString()}</li>
              <li>🔄 Indirect Impact: ${result.indirect.toLocaleString()}</li>
              <li>✨ Induced Impact: ${result.induced.toLocaleString()}</li>
              <li className="font-bold text-xl">📊 Total Economic Impact: ${result.total.toLocaleString()}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
