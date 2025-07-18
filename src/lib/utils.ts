import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {isProd, K8S_BASE_URL} from "@/lib/constants.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface CreateUserRequest {
  discord_id: string,
  discord_username: string,
  discord_email: string,
  avatar_id: string
}

export function formatBytes(bytes: number): string {
  const KB = 1024
  const MB = 1024 * 1024; // 1 MB = 1024 * 1024 bytes
  const GB = 1024 * MB;   // 1 GB = 1024 MB
  const TB = 1024 * GB;   // 1 TB = 1024 GB

  if(bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes >= 1024 && bytes <= KB) {
    return `${bytes / 1024} KB`
  }

  if(`${(bytes / MB).toFixed(2)} MB` == "0.00 MB") {
    return "0.01 MB"
  }

  if (bytes < GB) {
    return `${(bytes / MB).toFixed(2)} MB`;
  } else if (bytes < TB) {
    return `${(bytes / GB).toFixed(2)} GB`;
  } else {
    return `${(bytes / TB).toFixed(2)} TB`;
  }
}

export const discordRedirect = () => {
  if(isProd()) {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1303515055777648640&response_type=code&redirect_uri=https%3A%2F%2Fkraken-plugins.duckdns.org%2Fdiscord%2Foauth&scope=identify+email"
  } else {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1303515055777648640&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth&scope=identify+email"
  }
}

export const reconcileSubPeriod = (period: string) => {
  switch(period.toLowerCase()) {
    case "monthly":
      return "month"
    case "3-month":
      return "threeMonth"
    case "yearly":
      return "year"
  }
}

export const reverseReconcileSubPeriod = (pricing: string) => {
  switch (pricing) {
    case 'month':
      return 'monthly';
    case 'threeMonth':
      return '3-month';
    case 'year':
      return 'yearly';
    default:
      return 'monthly';
  }
};


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isPluginExpired = (expirationTimestamp: string): boolean => {
  return new Date(expirationTimestamp) <= new Date();
};

export const isInFreeTrialPeriod = (trialEnd: string): boolean => {
  try {
    const now = new Date();
    const compareDate = new Date(trialEnd);

    if (isNaN(compareDate.getTime())) {
      console.log(`${trialEnd} is not a valid date`);
      return false;
    }

    return now > compareDate;
  } catch (e) {
    console.error("Error comparing dates for free trial", e);
    return false;
  }
}

/**
 * Creates a new user in Cognito. If the user already exists it will be returned instead.
 * @param req CreateUserRequest the user object to create.
 */
export async function createCognitoUser(req: CreateUserRequest) {
  try {
    const response = await fetch(`${isProd() ? K8S_BASE_URL : 'http://localhost:8081'}/api/v1/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req)
    });

    const data = await response.json();
    if (response.status !== 200) {
      console.error(`Unexpected response code while creating user: ${response.status}`)
      console.error(data)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception thrown while making http request to create user:', error);
    return null;
  }
}