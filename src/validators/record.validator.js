import { z } from 'zod';

export const createRecordSchema = z.object({
    amount: z.number().positive(),
    type: z.enum(['income', 'expense']),
    category: z.string().min(1),
    date: z.string().datetime(),
    notes: z.string().optional()
});