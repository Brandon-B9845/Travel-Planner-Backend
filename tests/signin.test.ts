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
    test("tests that the function returns false when there is white space", () => {
        const fakePassword = "IAmAPassword "
        const fakeDbPassword = getSafePassword("IAmAPassword")
        expect(checkPassword(fakeDbPassword, fakePassword)).toEqual(false)
    })
    test("tests that the function returns false when a value equal to our split is present", () => {
        const fakePassword = "IAmAPassword : "
        const fakeDbPassword = getSafePassword("IAmAPassword")
        expect(checkPassword(fakeDbPassword, fakePassword)).toEqual(false)
    })
    test("tests that the function returns false when given special characters that do not match ", () => {
        const fakePassword = "IAmAPassword*_-#"
        const fakeDbPassword = getSafePassword("IAmAPassword")
        expect(checkPassword(fakeDbPassword, fakePassword)).toEqual(false)
    })
    test("tests that the function returns true when given special characters that match ", () => {
        const fakePassword = "IAmAPassword*_-#"
        const fakeDbPassword = getSafePassword("IAmAPassword*_-#")
        expect(checkPassword(fakeDbPassword, fakePassword)).toEqual(true)
    })
    test("tests that the function returns true when given special characters that do not match", () => {
        const fakePassword = "IAmAPassword"
        const fakeDbPassword = getSafePassword("IAmAPassword*5%8_-_")
        expect(checkPassword(fakeDbPassword, fakePassword)).toEqual(false)
    })
})