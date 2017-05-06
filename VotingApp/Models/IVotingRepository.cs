using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.Models
{
    public interface IVotingRepository
    {
        IEnumerable<Poll> GetAllPolls();

        Poll GetPollById(int id);        

        IEnumerable<Poll> GetPollsByUser(string username);

        void AddPoll(Poll poll);

        void DeletePoll(int id);

        void AddVotes(ICollection<Vote> votes);

        IEnumerable<User> GetAllUsers();

        void CastVote(int pollId, string voteName, string userIp);

        void CreateNewVoteOption(int pollId, string voteName);

        Task<bool> SaveChangesAsync();
    }
}
