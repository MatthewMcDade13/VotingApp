using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;

namespace VotingApp.Models
{
    public class User : IdentityUser
    {
        public DateTime DateCreated { get; set; }
    }
}
