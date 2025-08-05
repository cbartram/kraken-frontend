import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {Sparkles} from "lucide-react";

const PurchaseTokensSuccessDialog = ({ isOpen, onClose }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                        <div className="flex items-center justify-center w-full text-indigo-400">
                            Purchase Successful <Sparkles className="ml-4" />
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                       Your purchase for some shiny new Kraken tokens was <span className="text-green-400">successful</span>. Spend them
                        on some brand new plugins!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onClose()}
                        className={`bg-green-400 text-white hover:bg-green-500`}
                    >
                        Ok
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default PurchaseTokensSuccessDialog;