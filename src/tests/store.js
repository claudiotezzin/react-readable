{
    categories : {
        categoryId1: {
            name: "react"
            id : "categoryId1"
        }
    }
    posts : {
        postId1 : {
            id : "postId1";
            body : "......";
            category : "categoryId1";
            votes: 10;
            comments : ["comment1", "comment2"]    
        }
        postid2 : {
            id : "postid2";
            body : "......";    
            category : "categoryId1";
            votes: 10;
            comments : ["comment3", "comment4", "comment5"];
        }
        allIds : ["post1", "post2"]
    }
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
    }