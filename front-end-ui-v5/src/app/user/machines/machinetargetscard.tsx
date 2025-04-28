import { Badge } from "@heroui/react"; // Correct library name
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
} from "@heroui/react"; // Consolidated imports from the correct library
import { Computer, Cpu, Network, Server } from "lucide-react";

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

export function MachineCards({ machine }: MachineCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Computer className="h-5 w-5 text-primary" />
            <CardTitle>{machine.hostname}</CardTitle>
          </div>
          <Badge variant="outline" className="capitalize">
            {machine.os.family}
          </Badge>
        </div>
        <CardDescription>
          {machine.os.name} (v{machine.os.version}, Build {machine.os.build})
        </CardDescription>
      </CardHeader>

      <CardBody className="p-0">
        <Tabs>
          <TabList className="w-full rounded-none justify-start px-6 pt-2">
            <Tab>
              <Cpu className="h-4 w-4 mr-2" />
              System
            </Tab>
            <Tab>
              <Network className="h-4 w-4 mr-2" />
              Network
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className="p-6 pt-4">
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
                        <span className="font-medium">{machine.os.version}</span>
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
            </TabPanel>

            <TabPanel className="p-6 pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    IP Addresses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {machine.ips.map((ip, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="justify-start font-mono text-xs"
                      >
                        {ip}
                      </Badge>
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
                      <Badge
                        key={i}
                        variant="outline"
                        className="justify-start font-mono text-xs"
                      >
                        {mac}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}




export function MachineSkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-5 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-48 mt-2" />
      </CardHeader>

      <CardBody className="p-0">
        <Tabs>
          <TabList className="w-full rounded-none justify-start px-6 pt-2">
            <Tab disabled>
              <Skeleton className="h-4 w-20" />
            </Tab>
            <Tab disabled>
              <Skeleton className="h-4 w-20" />
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className="p-6 pt-4">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="p-6 pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}