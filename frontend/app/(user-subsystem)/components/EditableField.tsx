// InlineEditableField.js
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Pencil2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function InlineEditableField({ name, label, type = "text" } : { name: string, label: string, type?: string }) {
  const { control, formState: { errors } } = useFormContext();
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {!editMode ? (
              <div className="flex items-center justify-between">
                <span>{field.value || label}</span>
                <Pencil2Icon className="cursor-pointer" onClick={() => setEditMode(true)} />
              </div>
            ) : (
              <>
                <Input type={type} {...field} autoFocus />
                <div className="flex justify-end space-x-2">
                  <CheckIcon className="cursor-pointer" onClick={() => setEditMode(false)} />
                  <Cross2Icon className="cursor-pointer" onClick={() => setEditMode(false)} />
                </div>
              </>
            )}
          </>
        )}
      />
    </div>
  );
}