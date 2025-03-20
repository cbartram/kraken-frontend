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

const PurchasePluginDialog = ({ isOpen, onClose, plugin, onPurchase }) => {
    const [subscriptionPeriod, setSubscriptionPeriod] = useState("monthly");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handlePurchase = () => {
        if (agreedToTerms) {
            console.log(`Purchasing ${plugin.title} for ${priceForMonth(plugin.price)} tokens with ${subscriptionPeriod} subscription`);
            onPurchase(plugin, subscriptionPeriod);
        }
    };


    const priceForMonth = (price) => {
        if(subscriptionPeriod === "monthly") {
            return price.month
        } else if(subscriptionPeriod === "3-month") {
            return price.threeMonth
        }

        return price.year
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Confirm Purchase</AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-base">
                        Are you sure you want to purchase <span className="font-semibold text-green-400">{plugin.title}</span> for <span className="font-semibold text-green-400">{priceForMonth(plugin.priceDetails)} tokens</span>? Your subscription will start immediately.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 my-4">
                    <div className="space-y-2">
                        <Label htmlFor="subscription-period">Subscription Period</Label>
                        <Select value={subscriptionPeriod} onValueChange={setSubscriptionPeriod}>
                            <SelectTrigger id="subscription-period" className="w-full">
                                <SelectValue placeholder="Select subscription period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="3-month">3 Months</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={setAgreedToTerms}
                        />
                        <Label htmlFor="terms" className="text-sm">
                            I understand that I purchase at my own risk and bans will not receive refunds
                        </Label>
                    </div>
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

export default PurchasePluginDialog;