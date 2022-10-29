export interface Profile {
    id: string
    firstName: string
    lastName: string
    middleName?: string
    fullName: string
    email: string
    phone: string
    dob: string
    gender: string
    address: string
    city: string
    state: string
    country: string
    zip: string
    progress: number

    // Spiritual Background
    godsWorkings?: string[]
    salvationBrief: string
    churchName: string
    churchAddress: string
    pastorName: string
    pastorEmail: string
    pastorPhone: string
    reason: string

    // Health Information
    healthConditions: string[]
    healthIssueDescription: string
}

export interface User {
    fullName: string;
    email: string;
    password: string;
    role: string;
}

export interface Student {
    id: string;
    program: string
    schorlarshipReason: string
    platform: string
}