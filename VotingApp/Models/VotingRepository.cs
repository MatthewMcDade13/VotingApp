using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace VotingApp.Models
{
    public class VotingRepository : IVotingRepository
    {
        private VotingContext context;

        public VotingRepository(VotingContext context)
        {
            this.context = context;
        }

        public IEnumerable<Poll> GetAllPolls()
        {
            return context.Polls;
        }

        /// <summary>
        /// Finds a poll in the database by its Id
        /// </summary>
        /// <param name="pollId"></param>
        /// <returns>A Poll object, null if none are found</returns>
        public Poll GetPollById(int pollId)
        {
            List<Poll> result = context.Polls
                        .Include(poll => poll.Adresses)
                        .Include(poll => poll.Votes)
                        .Where( poll => poll.Id == pollId)
                        .ToList();

            //Returns null if result count is 0,
            //otherwise returns the Poll object that we want.
            return result.Count == 0 ? null : result[0];
        }

        public IEnumerable<Poll> GetPollsByUser(string username)
        {
            return context.Polls
                .Where(poll => poll.UserName == username);
        }

        public void AddPoll(Poll poll)
        {
            context.Add(poll);
        }

        public void DeletePoll(int id)
        {
            Poll poll = GetPollById(id);

            context.Polls.Remove(poll);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return context.Users;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await context.SaveChangesAsync()) > 0;
        }

        public void CastVote(int pollId, string voteName, string userIp)
        {
            Poll poll = GetPollById(pollId);

            //If passed in User Ip already exists on this poll object, return.
            //This is to ensure a user cannot exploit the site and vote multiple times
            if (poll.Adresses.Any(ip => ip.Adress == userIp))
            {
                return;
            }

            poll.Adresses.Add(new IpAdress
            {
                Adress = userIp
            });


            Vote vote = poll
                .Votes
                .Where(v => v.Name == voteName)
                .ToList()[0];

            vote.VoteCount++;
        }

        public void CreateNewVoteOption(int pollId, string voteName)
        {
            Poll poll = GetPollById(pollId);

            //If any vote options already exist on current poll with the passed in name, return
            //dont allow creation of a new vote option
            if (poll.Votes.Any( v => v.Name == voteName))
            {
                return;
            }

            poll.Votes.Add(new Vote()
            {
                Name = voteName,
                VoteCount = 0
            });
        }

        public void AddVotes(ICollection<Vote> votes)
        {
            context.AddRange(votes);
        }
    }
}
