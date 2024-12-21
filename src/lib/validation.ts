import { z } from 'zod';

const arabicRegex = /^[\u0600-\u06FF\s0-9.,!؟:؛(){}[\]"']+$/;

export const postSchema = z.object({
  title: z.string()
    .min(1, 'عنوان المقال مطلوب')
    .max(70, 'العنوان يجب ألا يتجاوز 70 حرفاً')
    .regex(arabicRegex, 'يجب أن يكون العنوان باللغة العربية'),

  body: z.string()
    .min(1, 'محتوى المقال مطلوب')
    .max(4000, 'المحتوى يجب ألا يتجاوز 4000 حرف')
    .regex(arabicRegex, 'يجب أن يكون المحتوى باللغة العربية'),

  author: z.string()
    .min(1, 'اسم الكاتب مطلوب')
    .max(35, 'اسم الكاتب يجب ألا يتجاوز 35 حرفاً')
    .regex(arabicRegex, 'يجب أن يكون اسم الكاتب باللغة العربية'),

  time_to_read: z.number()
    .min(1, 'وقت القراءة يجب أن يكون دقيقة واحدة على الأقل')
    .max(60, 'وقت القراءة يجب ألا يتجاوز 15 دقيقة'),

  published_date: z.string()
    .default(() => new Date().toISOString()),
});

export type PostFormValues = z.infer<typeof postSchema>;