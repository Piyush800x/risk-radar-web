'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface EmailNotificationProps {
    authId: string;
    status: boolean;
    activeStatus: boolean;
    planType: string;
}

export default function EmailNotificationButton({authId, status, activeStatus, planType}: EmailNotificationProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [emailingStatus, setEmailingStatus] = useState<boolean>(activeStatus);
    const btnState = (planType == "Standard" || planType == "Premium" ? false : true);

    // if (planType == "Standard" || planType == "Premium" ) {
    //     setBtnState(false);
    // }

    const setNotification = async () => {
        setLoading(true);
        try {
            const req = await fetch('/api/settings/set-emailing', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({authId: authId, status: status})
            })

            const res = await req.json()
            if (res.status == 200) {
                if (status) {
                    setEmailingStatus(true);
                    toast.success(`Email notification set!`)
                } 
                else {
                    setEmailingStatus(false);
                    toast.success(`Email notification unset!`)
                }
            }
            else {
                toast.error("Can't set email notification!")
            }

        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Email Notification</h1>
            <Button onClick={() => setNotification()} disabled={btnState}>Toggle</Button>
        </div>
    )
}