"use client";

import React, { useState } from "react";

import { Component } from "@/components/risk-chats/chart";
import { PieChartRisk } from "@/components/risk-chats/pie-chart-attack-distrubution";
import {BarChartData} from '@/components/risk-chats/barchart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const basicAlertTableData = [
  {
    altCat: "Windows Defender Logs",
    Severity: 50,
    total: 20,
  },
  {
    altCat: "Firewall Alerts",
    Severity: 80,
    total: 35,
  },
  {
    altCat: "Phishing Email Reports",
    Severity: 90,
    total: 15,
  },
  {
    altCat: "Malware Scans",
    Severity: 70,
    total: 25,
  },
  {
    altCat: "Unauthorized Login Attempts",
    Severity: 85,
    total: 40,
  },
  {
    altCat: "Data Exfiltration Alerts",
    Severity: 95,
    total: 10,
  },
  {
    altCat: "Network Intrusion Attempts",
    Severity: 75,
    total: 30,
  },
  {
    altCat: "Suspicious Process Execution",
    Severity: 60,
    total: 50,
  },
  {
    altCat: "Endpoint Protection Logs",
    Severity: 45,
    total: 18,
  },
  {
    altCat: "DNS Tunneling Alerts",
    Severity: 88,
    total: 12,
  },
];

const basicAdverTableData = [
  {
    tecq: "Phishing via Email",
    alert: 50
  },
  {
    tecq: "Credential Dumping",
    alert: 40
  },
  {
    tecq: "Command and Control (C2) Beaconing",
    alert: 30
  },
  {
    tecq: "Privilege Escalation",
    alert: 35
  },
  {
    tecq: "SQL Injection",
    alert: 20
  },
  {
    tecq: "Brute Force Authentication",
    alert: 60
  },
  {
    tecq: "Remote Code Execution",
    alert: 25
  },
  {
    tecq: "Data Exfiltration",
    alert: 45
  },
  {
    tecq: "DNS Spoofing",
    alert: 15
  },
  {
    tecq: "Malicious PowerShell Scripts",
    alert: 55
  },
  {
    tecq: "DLL Injection",
    alert: 22
  },
  {
    tecq: "Exploit Public-Facing Application",
    alert: 38
  },
  {
    tecq: "Man-in-the-Middle (MITM) Attack",
    alert: 18
  }
];


const defaultChartData  = [
  
  { attackType: "malware", attack: 1, fill: "var(--color-malware)" },
  { attackType: "ransomware", attack: 2, fill: "var(--color-ransomware)" },
  { attackType: "ddos", attack: 3, fill: "var(--color-ddos)" },
  { attackType: "other", attack: 4, fill: "var(--color-other)" },
]
export default function RiskInfoPage() {
  const [AlertValue, setAlertValue] = useState(0);
  const [HighSeverityValue, setHighSeverityValue] = useState(0);
  const [CriticalAssestsValue, setCriticalAssestsValue] = useState(0);
  const [AlertTableData, setAlertTableData] = useState(basicAlertTableData);
  const [AdvryTableData, setAdvryTableData] = useState(basicAdverTableData);
  return (
    <div className="flex justify-evenly gap-3 pt-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <AlertThreatCard
            title="All Alerts"
            disc={`${AlertValue}`}
            color="text-red-600"
          />
          <AlertThreatCard
            title="High Severity"
            disc={`${HighSeverityValue}`}
            color="text-cyan-500"
          />
          <AlertThreatCard
            title="Critical Assets"
            disc={`${CriticalAssestsValue}`}
            color="text-gray-500"
          />
        </div>
        <AlertsByServerity tableData={AlertTableData} />
        {/* <SampleCard />
        <SampleCard /> */}

      </div>
      <div className="flex flex-col gap-3  ">
        {/* <SampleCard /> */}
        <BarChartData />
        
        <div className="flex gap-3 ">
          <PieChartRisk chartData={defaultChartData} />
          <AdvasaryTech tableData={AdvryTableData.slice(3,7)} />
          {/* <SampleCard /> */}
        </div>
      </div>
    </div>
  );
}

function AlertThreatCard({ title, disc, color }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${color}`}>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{disc}</p>
      </CardContent>
      <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
    </Card>
  );
}

function AlertsByServerity({ tableData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts By Serverity</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Alert Category</TableHead>
              <TableHead className="">Severity</TableHead>
              <TableHead className="">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.altCat}>
                <TableCell>{data.altCat}</TableCell>
                <TableCell>{data.Severity}</TableCell>
                <TableCell>{data.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>


    </Card>
  );
}

function AdvasaryTech({ tableData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adversary techniques</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">techniques</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.altCat}>
                <TableCell className="text-left" >{data.tecq}</TableCell>
                <TableCell className="text-right">{data.alert}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>


    </Card>
  );
}



function SampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
