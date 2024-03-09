import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Pencil2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

interface InlineEditableFieldProps {
  name: string;
  label: string;
  onSave: (value: string) => void;
}

export default function InlineEditableField({ name, label, onSave }: InlineEditableFieldProps) {
    const { control } = useFormContext();
    const [editMode, setEditMode] = useState(false);

    const handleSave = (value: string) => {
        onSave(value);
        setEditMode(false);
    };

    return (
        <div className="flex flex-col items-start space-y-2">
            {!editMode ? (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <>
                            <div className="flex items-center space-x-2">
                                <span>{field.value}</span>
                                <Pencil2Icon className="h-5 w-5 cursor-pointer" onClick={() => setEditMode(true)} />
                            </div>
                            <div>{label}</div>
                        </>
                    )}
                />
            ) : (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <div className="flex flex-col items-start space-y-2">
                            <Input type="text" {...field} className="mb-2" />
                            <div>{label}</div>
                            <div className="flex items-center space-x-2">
                                <CheckIcon className="h-5 w-5 cursor-pointer" onClick={() => handleSave(field.value)} />
                                <Cross2Icon className="h-5 w-5 cursor-pointer" onClick={() => setEditMode(false)} />
                            </div>
                        </div>
                    )}
                />
            )}
        </div>
    );
};
