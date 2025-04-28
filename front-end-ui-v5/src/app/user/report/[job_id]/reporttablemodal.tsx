

import LogTable from "@/components/custom/log-table";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";

async function fetchJobs(job_id: string) {
    const res = await fetch("http://localhost:223/Job_details")
    if (!res.ok) {
        throw new Error("Failed to fetch jobs")
    }
    const temp: GetJobType[] = await res.json()
    const data = temp.find((elm) => elm.job_id === job_id)
    return data
}

import { useQuery } from "@tanstack/react-query";
import { GetJobType } from "./schema";
  
  export default function ReportLogDataDisplayModal({jobId} : {jobId : string}) {
    const job_id = jobId
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { data: job, isLoading, isError } = useQuery({
        queryKey: ['jobDetail', job_id],
        queryFn: () => fetchJobs(job_id as string),
    })
    return (
      <>
        <Button onPress={onOpen}>Show Logs</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="5xl" backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>

                <LogTable rows={job?.logs_ids ?? []} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  