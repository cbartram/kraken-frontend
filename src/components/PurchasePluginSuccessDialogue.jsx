import React, { useState } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const PurchasePluginSuccessDialog = ({ isOpen, onClose }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Purchase Successful</AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                        Enjoy your brand new plugin! <br />
                        Here are some details you should know <br />
                        <ul>
                            <li>Plugin Name: </li>
                            <li>License Key: </li>
                            <li>Expiration Time: </li>
                        </ul>
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

export default PurchasePluginSuccessDialog;