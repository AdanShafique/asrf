"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Part } from "@/lib/types";

interface DeletePartDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  part: Part;
  onDelete: (partId: string) => void;
}

export function DeletePartDialog({ isOpen, setIsOpen, part, onDelete }: DeletePartDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the part
            <span className="font-bold"> {part.id} ({part.name}) </span> 
            from the records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(part.id)} className="bg-destructive hover:bg-destructive/90">
            Yes, delete part
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
