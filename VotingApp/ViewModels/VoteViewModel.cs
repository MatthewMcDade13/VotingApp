namespace VotingApp.ViewModels
{
    public class VoteViewModel
    {
        //The Id of the poll associated with the vote
        public int PollId { get; set; }
        public string Name { get; set; }
        public int VoteCount { get; set; }

        //Used for when a user casts/creates a vote
        public string UserIp { get; set; }
    }
}
