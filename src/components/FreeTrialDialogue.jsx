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
import {Clock, Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button.js";

const FreeTrialDialogue = ({ isOpen, onClose, onFreeTrialStart }) => {

    const startFreeTrial = () => {
        onFreeTrialStart();
        onClose()
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold flex items-center">
                        <Clock color="#34eb5e"></Clock>
                        &nbsp;
                        Free Trial
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                        <div>
                            <p>Your Overpowered Kraken plugins are only a click away! <br />
                                Here are some details you should know:</p> <br/>
                            <ul>
                                <li> - Your free trial lasts <span className="text-green-400 font-bold">7 days</span></li>
                                <li> - Your free trial starts <span className="text-green-400 font-bold">immediately</span></li>
                                <li> - You will be granted access to <span className="text-green-400 font-bold">ALL</span> Kraken plugins, trial plugins do <span className="text-green-400 font-bold">NOT</span> require a license key.</li>
                                <li> - You will <span className="text-green-400 font-bold">NOT</span> be charged after your free trial ends</li>
                                <li> - Information about your trial and its end date can be found on the <a href="/profile">profile page</a></li>
                                <li> - When your trial ends your plugin access will be <span className="text-red-500 font-bold">revoked</span></li>
                            </ul>
                            <br />
                            <p>Are you sure you'd like to start your free trial now?</p>
                            <div className="flex align-middle justify-center mt-4">
                                <Button className="w-75 bg-green-400 hover:bg-green-500" onClick={() => startFreeTrial()}>
                                    <Sparkles />
                                    Start 7 Day Free Trial
                                </Button>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onClose()}
                        className={`bg-red-500 text-white hover:bg-red-600`}
                    >
                        Close
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default FreeTrialDialogue;