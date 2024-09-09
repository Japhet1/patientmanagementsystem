import * as sdk from "node-appwrite"

// export const { 
//     PROJECT_ID, 
//     API_KEY, 
//     DATABASE_ID, 
//     PATIENT_COLLECTION_ID, 
//     APPOINTMENT_COLLECTION_ID, 
//     DOCTOR_COLLECTION_ID, 
//     NEXT_PUBLIC_BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT
// } = process.env

const PROJECT_ID="66d9d47c0014c0143038"
const API_KEY="standard_d08f96ac4e4cdd365dc8d1f266592188cd7553f968456c4d497682734e6ee3761fc8bfd2c44685bfe7f32d919f7d7d8b070e9de5ceb47e666e3b930eb792ecaf9e30b7cb0cbddc416b7918b28d0c0e7b1b722f3456c201b030b311a8fa43fe7222157c9fd00047338a96efa8d29f461a0f7832a8787b22edfc47e5528de88d1c"
const DATABASE_ID="66d9d606000b3258c6ce"
const PATIENT_COLLECTION_ID="66d9d7940012c5f52f63"
const DOCTOR_COLLECTION_ID="66d9d7f3002e0298b98a"
const APPOINTMENT_COLLECTION_ID="66d9d83d00277a825298"
const NEXT_PUBLIC_BUCKET_ID="66d9d8aa00253700aa6f"
const NEXT_PUBLIC_ENDPOINT="https://cloud.appwrite.io/v1"


const client = new sdk.Client()
client.setEndpoint(NEXT_PUBLIC_ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!)


export const database = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)