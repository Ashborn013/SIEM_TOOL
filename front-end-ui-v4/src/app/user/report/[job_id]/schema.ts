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


export type GetJobType = z.infer<typeof someSchema>