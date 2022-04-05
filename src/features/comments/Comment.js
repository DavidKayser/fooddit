export class Comment {
    constructor(name, body, postedOn, downVotes, upVotes, subComments) {
        this.name = name;
        this.body = body;
        this.postedOn = postedOn;
        this.downVotes = downVotes;
        this.upVotes = upVotes;
        this.subComments = subComments;
    }
}