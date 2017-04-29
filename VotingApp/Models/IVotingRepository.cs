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

        IEnumerable<User> GetAllUsers();

        void AddPoll(Poll poll);

        Task<bool> SaveChangesAsync();
    }
}
