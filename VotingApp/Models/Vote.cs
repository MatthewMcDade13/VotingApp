using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int VoteCount { get; set; }
    }
}
