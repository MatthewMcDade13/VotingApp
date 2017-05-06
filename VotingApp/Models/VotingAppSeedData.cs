using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VotingApp.Models
{
    public class VotingAppSeedData
    {
        private UserManager<User> userManager;
        private VotingContext context;

        public VotingAppSeedData(VotingContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task EnsureSeedData()
        {
            if (await userManager.FindByEmailAsync("app.test@admin.com") == null)
            {
                User user = new User()
                {
                    UserName = "admin",
                    Email = "app.test@admin.com",
                    DateCreated = DateTime.UtcNow
                };

                await userManager.CreateAsync(user, "Password1!");
            }


            if (context.Polls.Any() == false)
            {
                Poll colorPoll = new Poll()
                {
                    Name = "Favorite Color",
                    UserName = "admin",
                    Votes = new List<Vote>
                    {
                        new Vote
                        {
                            Name = "Blue",
                            VoteCount = 0
                        },
                        new Vote
                        {
                            Name = "Red",
                            VoteCount = 2
                        }
                    }
                };

                context.Polls.Add(colorPoll);
                context.Votes.AddRange(colorPoll.Votes);

                Poll heroPoll = new Poll()
                {
                    Name = "Favorite Hero",
                    UserName = "admin",
                    Votes = new List<Vote>
                    {
                        new Vote
                        {
                            Name = "Superman",
                            VoteCount = 1
                        },
                        new Vote
                        {
                            Name = "Batman",
                            VoteCount = 2
                        }
                    }
                };

                context.Polls.Add(heroPoll);
                context.Votes.AddRange(heroPoll.Votes);

                await context.SaveChangesAsync();
            }
        }
    }
}
