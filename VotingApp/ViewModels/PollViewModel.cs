using System.Collections.Generic;
using VotingApp.Models;

namespace VotingApp.ViewModels
{
    public class PollViewModel
    {
        public string Name { get; set; }
        public ICollection<Vote> Votes { get; set; }
    }
}
