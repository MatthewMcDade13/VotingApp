using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.Models
{
    public class User : IdentityUser
    {
        public DateTime DateCreated { get; set; }
    }
}
