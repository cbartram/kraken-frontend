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
import {CheckCircle} from "lucide-react";
import {formatDate} from "@/lib/utils.js";

const PurchasePluginSuccessDialog = ({ isOpen, onClose, successResponse }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold flex items-center">
                        <CheckCircle color="#34eb5e"></CheckCircle>
                        &nbsp;
                        Purchase Successful
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                        <div>
                            <p>Enjoy your brand new <span className="text-indigo-500 font-bold">{successResponse.pluginName}</span> plugin! <br />
                                Here are some details you should know:</p> <br /> <br/>
                            <ul>
                                <li>Plugin Name: <span className="text-green-400 font-bold">{successResponse.pluginName}</span></li>
                                <li>License Key: <span className="text-green-400 font-bold">{successResponse.licenseKey}</span></li>
                                <li>Expiration Time: <span className="text-green-400 font-bold">{formatDate(successResponse.expirationTimestamp)}</span></li>
                            </ul>
                            <br />
                            <p>You can also find this information on your <a href="/profile">profile</a> page.</p>
                        </div>
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