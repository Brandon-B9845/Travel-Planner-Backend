import { getSafePassword, hash } from "../aws/lambdas/signup";
import {describe, expect, test} from '@jest/globals';

describe("Tests hash function", () => {
  test("tests hash returns same value given same input", () => {
    const fakePassword = 'securePassword'
    const anotherFakePassword = 'securePassword'
    expect(hash(fakePassword)).toEqual(hash(anotherFakePassword));
  });

  test("tests hash is different with different inputs", () => {
    const fakePassword = 'securePassword'
    const anotherFakePassword = 'securePassword1'
    expect(hash(fakePassword)).not.toEqual(hash(anotherFakePassword));
  });
});

describe("Tests getSafePassword function", () => {
  test("tests function returns different values given same password", () => {
    const fakePassword = getSafePassword('securePassword')
    const anotherFakePassword = getSafePassword('securePassword')
    expect(fakePassword).not.toEqual(anotherFakePassword);

  });
});