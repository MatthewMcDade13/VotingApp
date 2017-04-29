using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.Models
{
    public class VotingRepository : IVotingRepository
    {
        private VotingContext context;

        public VotingRepository(VotingContext context)
        {
            this.context = context;
        }


        public void AddPoll(Poll poll)
        {
            context.Add(poll);
        }

        public IEnumerable<Poll> GetAllPolls()
        {
            return context.Polls;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return context.Users;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await context.SaveChangesAsync()) > 0;
        }
    }
}
