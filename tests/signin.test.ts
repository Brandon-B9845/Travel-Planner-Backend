import {describe, expect, test} from '@jest/globals';
import { checkPassword }  from '../aws/lambdas/signin'
import { getSafePassword } from '../aws/lambdas/signup'

describe("Tests password check", () => {
    test("tests that the function returns false when given 2 different passwords", () => {
        const fakePassword = "IAmAPassword"
        const fakeDbPassword = getSafePassword("IAmADifferentPassword")
        
        const results = checkPassword(fakeDbPassword, fakePassword)
        expect(results).toEqual(false)
    })
    test("tests that the function returns true when passwords match", () => {
        const fakePassword = "IAmAPassword"
        const fakeDbPassword = getSafePassword("IAmAPassword")
        expect(checkPassword(fakeDbPassword, fakePassword)).toEqual(true)
    })
})