"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

import bcrypt from "bcryptjs";  

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    // 確認資料符合 schema 規則
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
        };
    
    // 把拿進來的資料定義成 email password name 
    const { email, password, name } = validatedFields.data;
    // 產生 hash 密碼 加鹽 10 次
    const hashedPassword = await bcrypt.hash(password, 10);
    // 確認 email 是否已經被使用
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email already use!" };
    }
    
    // 寫入資料到資料庫
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    
    await sendVerificationEmail(
        verificationToken.email, 
        verificationToken.token,
        );
    return { success: "Confication email sent!" }; 
    
};
