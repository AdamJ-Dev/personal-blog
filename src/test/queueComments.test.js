import { orderComments } from "../helpers/queueComments"
import { commentSectionTestCases } from "./commentSectionCases"

for (let testCase of commentSectionTestCases) {
        it(testCase.description, () => {
            console.log(testCase.description)
            expect(orderComments(testCase.test)).toEqual(testCase.expectation)
        })
}