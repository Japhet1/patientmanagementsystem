"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "../customFormField"
import { FormFieldType } from "@/lib/types"
import SubmitButton from "../submitButton"
// import { useState } from "react"
import { userFormValidation } from "@/lib/validation"


const PatientForm = () => {

    // const [ isLoading, setIsLoading ] = useState(false)

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
    function onSubmit(values: z.infer<typeof userFormValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                    name="username"
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
                <SubmitButton >Get started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm