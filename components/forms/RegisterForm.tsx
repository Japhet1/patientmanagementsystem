"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../customFormField"
import { FormFieldType } from "../customFormField"
import SubmitButton from "../submitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOption } from "@/constants"
import { Label } from "../ui/label"

const RegisterForm = ({ user }: {user: User | undefined }) => {

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more of yourself.</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
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
                <div className="flex flex-col gap-6 xl:flex-row">
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
                        label="Phone number"
                        placeholder="(225) 654-1487"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        control={form.control} 
                        fieldType={FormFieldType.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                        iconSrc="/assets/icons/calendar.svg"
                        iconAlt="calendar"
                    />
                    <CustomFormField 
                        control={form.control} 
                        fieldType={FormFieldType.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup 
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOption.map(option => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem
                                                value={option}
                                                id={option}
                                            />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
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
                        label="Phone number"
                        placeholder="(225) 654-1487"
                    />
                </div>
                <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm