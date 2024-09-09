"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "../customFormField"
import { FormFieldType } from "../customFormField"
import SubmitButton from "../submitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"

const PatientForm = () => {

    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState(false)

     // 1. Define your form.
    const form = useForm<z.infer<typeof userFormValidation>>({
        resolver: zodResolver(userFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })
 
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof userFormValidation>) {
        setIsLoading(true)
        try {
            const user = {
              name: values.name,
              email: values.email,
              phone: values.phone,
            };
            const newUser = await createUser(user);
            if (newUser) {
              router.push(`/patients/${newUser.$id}/register`);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section>
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>
                <CustomFormField 
                    control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField 
                    control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="johndoe@email.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField 
                    control={form.control} 
                    fieldType={FormFieldType.PHONE_INPUT}
                    name="phone"
                    label="Phone"
                    placeholder="(225) 654-1487"
                />
                <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm