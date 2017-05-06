using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingApp.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [StringLength(25, MinimumLength = 5)]
        public string UserName { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 8)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
