using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VotingApp.Models;

namespace VotingApp.ViewModels
{
    public class PollViewModel
    {
        public string Name { get; set; }
        public ICollection<Vote> Votes { get; set; }
    }
}
