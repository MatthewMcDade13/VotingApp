using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.ViewModels
{
    public class VoteViewModel
    {
        //The Id of the poll associated with the vote
        public int PollId { get; set; }
        public string Name { get; set; }
        public int VoteCount { get; set; }
    }
}
