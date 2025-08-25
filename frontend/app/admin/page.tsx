"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventData {
  eventName: string;
  domain: string;
}

export default function AdminDashboard() {
  const [eventData, setEventData] = useState<EventData>({
    eventName: "",
    domain: "",
  });

  const domains = [
    "Science",
    "Technology",
    "Engineering",
    "Mathematics",
    "Computer Science",
    "Robotics",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Data:", eventData);
    setEventData({ eventName: "", domain: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-card-foreground">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">25</p>
          </CardContent>
        </Card>
        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-card-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">128</p>
          </CardContent>
        </Card>
        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-card-foreground">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">8</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Add New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="eventName" className="text-sm font-medium text-foreground">
                Event Name
              </label>
              <Input
                id="eventName"
                value={eventData.eventName}
                onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                required
                className="bg-background border-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="domain" className="text-sm font-medium text-foreground">
                Domain
              </label>
              <Select
                value={eventData.domain}
                onValueChange={(value) => setEventData({ ...eventData, domain: value })}
              >
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Add Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}