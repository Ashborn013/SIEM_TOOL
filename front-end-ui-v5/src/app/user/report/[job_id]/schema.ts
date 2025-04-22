import z from "zod"
export const someSchema = z.object({
    _id: z.string(),
    job: z.string(),
    job_id: z.string(),
    level: z.string(),
    logs_ids: z.array(z.unknown()),
    message: z.string(),
    time: z.number(),
});

export const logs_idsSchema = 
  z.object({
    "@timestamp": z.string(),
    LogonType: z.string(),
    RemoteIpAddress: z.string(),
    RemoteUserWorkStation: z.string(),
    ecs: z.array(z.string()),
    event: z.array(z.string()),
    event_id: z.string(),
    hostname: z.string(),
    id: z.string(),
    log: z.array(z.string()),
    message: z.string(),
    name: z.string(),
    time_diff: z.number(),
    type: z.string()
  })


export type GetJobType = z.infer<typeof someSchema>
export type LogIdType = z.infer<typeof logs_idsSchema>