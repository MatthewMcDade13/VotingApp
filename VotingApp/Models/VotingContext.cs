using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace VotingApp.Models
{
    public class VotingContext : IdentityDbContext<User>
    {
        public DbSet<Poll> Polls { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public IConfigurationRoot config;

        public VotingContext(IConfigurationRoot config, DbContextOptions options)
            : base(options)
        {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseNpgsql(config["Data:ConnectionString"]);
        }
    }
}
