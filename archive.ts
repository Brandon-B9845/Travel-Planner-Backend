import { scryptSync, randomBytes, createHash } from "crypto"

export function hash(input: string) {
    return createHash("sha256").update(input).digest("hex")
  }
  
  export function getSafePassword(password: string) {
    const hashResult = hash(password)
  
    const salt = randomBytes(16).toString("hex")
  
    const hashedPassword = scryptSync(hashResult, salt, 64)
  
    return `${salt} : ${hashedPassword}`
  }