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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const BetaPluginDialog = ({ isOpen, onClose, plugin, onPurchase }) => {
    const [subscriptionPeriod, setSubscriptionPeriod] = useState("monthly");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handlePurchase = () => {
        if (agreedToTerms) {
            onPurchase(plugin, subscriptionPeriod);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Confirm Beta Purchase</AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                        Beta plugins are still under testing. You will likely experience bugs, crashes, or non functioning plugin settings. <br /><br /> Beta plugins are <span className="text-green-400 font-bold">FREE</span> while they are in their
                        testing period. When the plugin goes live your access to use the plugin will be <span className="text-rose-600 font-bold">REVOKED</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={setAgreedToTerms}
                        />
                        <Label htmlFor="terms" className="text-sm">
                            I understand that I purchase at my own risk and bans, even for beta plugins, will not receive refunds.
                        </Label>
                    </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handlePurchase}
                        disabled={!agreedToTerms}
                        className={`bg-green-400 text-white hover:bg-green-500 ${!agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Purchase
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default BetaPluginDialog;