export class Comment {
    constructor(name, comment, postedOn, downVotes, upVotes, subComments) {
        this.name = name;
        this.comment = comment;
        this.postedOn = postedOn;
        this.downVotes = downVotes;
        this.upVotes = upVotes;
        this.subComments = subComments;
    }
}