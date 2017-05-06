using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using VotingApp.Models;
using VotingApp.ViewModels;

namespace VotingApp.Controllers.Api
{
    [Route("api/poll")]
    public class PollDataController : Controller
    {
        private IVotingRepository repo;

        public PollDataController(IVotingRepository repo)
        {
            this.repo = repo;
        }

        //GET api/poll/4
        [HttpGet("{id}")]
        public IActionResult GetPollById(int id)
        {
            Poll poll = repo.GetPollById(id);

            //Returns a Poll JSON object if poll is not null, otherwise returns
            //a bad request response.
            return poll != null ? Json(poll) : (IActionResult)BadRequest(new
                                               { Error = "Poll id was not found in database" });
        }

        //GET api/poll/total
        [HttpGet("total")]
        public IActionResult GetAllPolls()
        {
            var allPolls = repo.GetAllPolls();
            return Json(allPolls.ToArray());
        }

        //GET api/poll/userpolls
        [HttpGet("userpolls")]
        [Authorize]
        public IActionResult GetUserPolls()
        {
            return Json(repo.GetPollsByUser(User.Identity.Name)
                .ToArray());
        }

        //PUT api/poll/vote/new
        [HttpPut("vote/new")]
        [Authorize]
        public async Task<IActionResult> CreateNewVoteOption([FromBody]VoteViewModel vm)
        {
            if (vm.Name == null)
            {
                return BadRequest();
            }

            repo.CreateNewVoteOption(vm.PollId, vm.Name);
            await repo.SaveChangesAsync();

            //after we have created the vote option, 
            //have the user automatically vote for it
            await CastVote(vm);

            return Ok();
        }
        
        //PUT api/poll/vote
        [HttpPut("vote")]
        public async Task<IActionResult> CastVote([FromBody]VoteViewModel vm)
        {
            //string ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            repo.CastVote(vm.PollId, vm.Name, vm.UserIp);
            await repo.SaveChangesAsync();
            return Ok();
        }

        //POST api/poll/new
        [HttpPost("new")]
        [Authorize]
        public async Task<IActionResult> CreateNewPoll([FromBody] PollViewModel vm)
        {

            Poll poll = new Poll()
            {
                Name = vm.Name,
                UserName = User.Identity.Name,
                Votes = vm.Votes
            };

            repo.AddPoll(poll);
            repo.AddVotes(poll.Votes);

            await repo.SaveChangesAsync();            

            return Created($"api/poll/{poll.Id}", poll);
        }

        //DELETE api/poll/delete/{pollName}?user={userName}
        [HttpDelete("delete/{pollId}")]
        [Authorize]
        public async Task<IActionResult> DeletePoll(int pollId)
        {
            string userName = Request.Query["user"];

            //Some added security to make sure that the person deleting this poll
            //is the person who is logged in
            if (userName == User.Identity.Name)
            {
                repo.DeletePoll(pollId);
                await repo.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
        }
    }
}
