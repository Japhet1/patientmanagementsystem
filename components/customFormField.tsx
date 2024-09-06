"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Control } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js';

interface CustomFormFieldProp {
    control: Control<any>
    fieldType: FormFieldType
    name: string
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    children?: React.ReactNode
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProp}) => {
    const { fieldType, iconSrc, iconAlt, placeholder } = props
    
    switch(fieldType) {
        case FormFieldType.INPUT: 
            return(
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image className="ml-2" src={iconSrc} height={24} width={24} alt={iconAlt || "ICON"} />
                    )}
                    <FormControl>
                        <Input className="shad-input border-0" placeholder={placeholder} {...field} />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        className="input-phone" 
                        defaultCountry="GH" 
                        placeholder={placeholder} 
                        value={field.value as E164Number | undefined} 
                        onChange={field.onChange}
                        international
                        withCountryCallingCode
                    />
                </FormControl>
            )
    }
}


const CustomFormField = (props: CustomFormFieldProp) => {

    const { control, fieldType, name, label } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error"/>
                </FormItem>
            )}
        />
    )
}

export default CustomFormField