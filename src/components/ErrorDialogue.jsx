import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.js";
import React from "react";
import {AlertTriangle} from "lucide-react";

const ErrorDialog = ({ isOpen, onClose, message }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold flex items-center">
                        <AlertTriangle color="#eb3440" />
                        &nbsp;
                        Purchase Failed
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                        Something went wrong purchasing your plugin. Here's what we know:
                        &nbsp;
                        <span className="text-red-500 font-bold">{message}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onClose()}
                        className={`bg-red-500 text-white hover:bg-red-700`}
                    >
                        Ok
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ErrorDialog;