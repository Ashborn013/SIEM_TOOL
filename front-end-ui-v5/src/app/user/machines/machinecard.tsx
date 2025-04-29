"use client";
import { Badge, Chip, Divider } from "@heroui/react"; // Correct library name
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
  Skeleton,
} from "@heroui/react"; // Consolidated imports from the correct library

import { Computer, Cpu, CpuIcon, Network, Server } from "lucide-react";

interface MachineData {
  hostname: string;
  ips: string[];
  macs: string[];
  os: {
    build: string;
    family: string;
    kernel: string;
    name: string;
    platform: string;
    type: string;
    version: string;
  };
}

interface MachineCardProps {
  machine: MachineData;
}

export function MachineCard({ machine }: MachineCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Computer className="h-5 w-5" />
            <span>{machine.hostname}</span>
          </div>
          <Chip variant="solid">{machine.os.family}</Chip>
        </CardHeader>
        <CardBody>
          {machine.os.name} (v{machine.os.version}, Build {machine.os.build})
          <Divider />
          <Tabs>
            <Tab
              key="System"
              title={
                <div className="flex items-center space-x-2">
                  <Cpu />
                  <span>System</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">OS Information</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{machine.os.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version:</span>
                        <span className="font-medium">
                          {machine.os.version}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Build:</span>
                        <span className="font-medium">{machine.os.build}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className="font-medium capitalize">
                          {machine.os.platform}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Kernel Information</h3>
                    <div className="text-sm text-muted-foreground">
                      <p className="break-words">{machine.os.kernel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              key="Network"
              title={
                <div className="flex items-center space-x-2">
                  <Network />
                  <span>Network</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    IP Addresses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {machine.ips.map((ip, i) => (
                      <Chip
                        variant="dot"
                        className="justify-start font-mono text-xs"
                        key={i}
                      >
                        {ip}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    MAC Addresses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {machine.macs.map((mac, i) => (
                      <Chip
                        variant="dot"
                        className="justify-start font-mono text-xs"
                        key={i}
                      >
                        {mac}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
