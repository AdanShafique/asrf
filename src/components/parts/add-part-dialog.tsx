"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Part, Lab } from "@/lib/types";

interface AddPartDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  labs: Lab[];
  onAdd: (part: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  labId: z.string({ required_error: "Please select a lab." }),
});

export function AddPartDialog({ isOpen, setIsOpen, labs, onAdd }: AddPartDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      labId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAdd(values);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Part</DialogTitle>
          <DialogDescription>
            Enter the details for the new part.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Part Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Voltage Regulator" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="labId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Assigned Lab</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a lab" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {labs.map(lab => (
                                <SelectItem key={lab.id} value={lab.id}>
                                    {lab.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Part</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
