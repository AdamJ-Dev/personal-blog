const noComments = [];
const oneComment = [
    {
        depth: 0,
        id: "A",
        parentId: null
    }
];
const twoComments = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 0,
        id: "B",
        parentId: null
    }
];
const oneCommentOneChild = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    }
];
const twoCommentsOneChildEachOrder1 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 0,
        id: "C",
        parentId: null
    }, 
    {
        depth: 1,
        id: "D",
        parentId: "C"
    },
];
const twoCommentsOneChildEachOrder2 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 0,
        id: "C",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    }, 
    {
        depth: 1,
        id: "D",
        parentId: "C"
    },
];

const twoCommentsOneChildEachOrder2Expectation = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    }, 
    {
        depth: 0,
        id: "C",
        parentId: null
    },
    {
        depth: 1,
        id: "D",
        parentId: "C"
    },
];

const oneCommentTwoChildren = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    }
]

const twoCommentsTwoChildrenEachOrder1 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 0,
        id: "D",
        parentId: null
    },
    {
        depth: 1,
        id: "E",
        parentId: "D"
    },
    {
        depth: 1,
        id: "F",
        parentId: "D"
    }
]

const twoCommentsTwoChildrenEachOrder2 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 0,
        id: "B",
        parentId: null
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 1,
        id: "D",
        parentId: "A"
    },
    {
        depth: 1,
        id: "E",
        parentId: "B"
    },
    {
        depth: 1,
        id: "F",
        parentId: "B"
    }
]

const twoCommentsTwoChildrenEachOrder2Expectation = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 1,
        id: "D",
        parentId: "A"
    },
    {
        depth: 0,
        id: "B",
        parentId: null
    },
    {
        depth: 1,
        id: "E",
        parentId: "B"
    },
    {
        depth: 1,
        id: "F",
        parentId: "B"
    }
]


const twoCommentsTwoChildrenEachOrder3 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 0,
        id: "C",
        parentId: null
    },
    {
        depth: 1,
        id: "D",
        parentId: "A"
    },
    {
        depth: 1,
        id: "E",
        parentId: "C"
    },
    {
        depth: 1,
        id: "F",
        parentId: "C"
    }
]

const twoCommentsTwoChildrenEachOrder3Expectation = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 1,
        id: "D",
        parentId: "A"
    },
    {
        depth: 0,
        id: "C",
        parentId: null
    },
    {
        depth: 1,
        id: "E",
        parentId: "C"
    },
    {
        depth: 1,
        id: "F",
        parentId: "C"
    }
]

 
const oneCommentOneChainOfAncestry = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 2,
        id: "C",
        parentId: "B"
    }
]

const twoCommentsOneChainOfAncestryEachOrder1 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 2,
        id: "C",
        parentId: "B"
    },
    {
        depth: 0,
        id: "D",
        parentId: null
    },
    {
        depth: 1,
        id: "E",
        parentId: "D"
    },
    {
        depth: 2,
        id: "F",
        parentId: "E"
    }
]

const twoCommentsOneChainOfAncestryEachOrder2 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 0,
        id: "B",
        parentId: null
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 2,
        id: "D",
        parentId: "C"
    },
    {
        depth: 1,
        id: "E",
        parentId: "B"
    },
    {
        depth: 2,
        id: "F",
        parentId: "E"
    }
]

const twoCommentsOneChainOfAncestryEachOrder2Expectation = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 2,
        id: "D",
        parentId: "C"
    },
    {
        depth: 0,
        id: "B",
        parentId: null
    },
    {
        depth: 1,
        id: "E",
        parentId: "B"
    },
    {
        depth: 2,
        id: "F",
        parentId: "E"
    }
]

const twoCommentsOneChainOfAncestryEachOrder3 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 0,
        id: "C",
        parentId: null
    },
    
    {
        depth: 2,
        id: "D",
        parentId: "B"
    },
    {
        depth: 1,
        id: "E",
        parentId: "C"
    },
    {
        depth: 2,
        id: "F",
        parentId: "E"
    }
]


const twoCommentsOneChainOfAncestryEachOrder3Expectation = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    
    {
        depth: 2,
        id: "D",
        parentId: "B"
    },
    {
        depth: 0,
        id: "C",
        parentId: null
    },
    {
        depth: 1,
        id: "E",
        parentId: "C"
    },
    {
        depth: 2,
        id: "F",
        parentId: "E"
    }
]

const oneCommentTwoChainsOfAncestryOrder1 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 2,
        id: "C",
        parentId: "B"
    },
    {
        depth: 1,
        id: "D",
        parentId: "A"
    },
    
    {
        depth: 2,
        id: "E",
        parentId: "D"
    }
]

const oneCommentTwoChainsOfAncestryOrder2 = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 2,
        id: "D",
        parentId: "B"
    },
    {
        depth: 2,
        id: "E",
        parentId: "C"
    }
]


const oneCommentTwoChainsOfAncestryOrder2Expectaion = [
    {
        depth: 0,
        id: "A",
        parentId: null
    },
    {
        depth: 1,
        id: "B",
        parentId: "A"
    },
    {
        depth: 2,
        id: "D",
        parentId: "B"
    },
    {
        depth: 1,
        id: "C",
        parentId: "A"
    },
    {
        depth: 2,
        id: "E",
        parentId: "C"
    }
]



class TestCase {
    constructor(test, expectation, description) {
        this.test = test;
        this.expectation = expectation;
        this.description = description;
    }
}


export const commentSectionTestCases = [
    new TestCase(noComments, noComments, "no comments"),
    new TestCase(oneComment, oneComment, "one comment"),
    new TestCase(twoComments, twoComments, "two comments"),
    new TestCase(oneCommentOneChild, oneCommentOneChild, "one comment one child"),
    new TestCase(twoCommentsOneChildEachOrder1, twoCommentsOneChildEachOrder1, "two comments one child each order 1"),
    new TestCase(twoCommentsOneChildEachOrder2, twoCommentsOneChildEachOrder2Expectation, "two comments one child each order two"),
    new TestCase(oneCommentTwoChildren, oneCommentTwoChildren, "one comment two children"),
    new TestCase(twoCommentsTwoChildrenEachOrder1, twoCommentsTwoChildrenEachOrder1, "two comments two children each order 1"),
    new TestCase(twoCommentsTwoChildrenEachOrder2, twoCommentsTwoChildrenEachOrder2Expectation, "two comments two children each order 2"),
    new TestCase(twoCommentsTwoChildrenEachOrder3, twoCommentsTwoChildrenEachOrder3Expectation, "two comments two children each order 3"),
    new TestCase(oneCommentOneChainOfAncestry, oneCommentOneChainOfAncestry, "one comment one chain of ancestry"),
    new TestCase(twoCommentsOneChainOfAncestryEachOrder1, twoCommentsOneChainOfAncestryEachOrder1, "two comments one chain of ancestry each order 1"),
    new TestCase(twoCommentsOneChainOfAncestryEachOrder2, twoCommentsOneChainOfAncestryEachOrder2Expectation, "two comments one chain of ancestry each order 2"),
    new TestCase(twoCommentsOneChainOfAncestryEachOrder3, twoCommentsOneChainOfAncestryEachOrder3Expectation, "two comments one chain of ancestry each order 3"),
    new TestCase(oneCommentTwoChainsOfAncestryOrder1, oneCommentTwoChainsOfAncestryOrder1, "one comment two chains of ancestry order 1"),
    new TestCase(oneCommentTwoChainsOfAncestryOrder2, oneCommentTwoChainsOfAncestryOrder2Expectaion, "one comment two chains of ancestry order 2")
]   






