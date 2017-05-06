using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.Models
{
    public class Poll
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public ICollection<Vote> Votes { get; set; }
        //Collection of the IP adresses of the people who have voted on this Poll
        public ICollection<IpAdress> Adresses { get; set; }
    }
}
