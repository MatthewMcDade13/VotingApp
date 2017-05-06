using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VotingApp.Models;

namespace VotingApp.Controllers.Api
{
    [Route("api/user")]
    public class UserDataController : Controller
    {
        private IVotingRepository repo;

        public UserDataController(IVotingRepository repo)
        {
            this.repo = repo;
        }

        //GET api/user/ip
        [HttpGet("ip")]
        public IActionResult GetUserIp()
        {
            string ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            return Json(new { Adress = ip });
        }

        //GET api/user/{userName}
        //Returns a JSON that contains data that tells frontend if the user viewing a poll is the owner
        [HttpGet("{userName}")]
        public IActionResult CheckPollOwnership(string userName)
        {
            if (userName == User.Identity.Name)
            {
                return Json(new { IsOwner = true });
            }

            return Json(new { IsOwner = false });
        }

        //GET api/user/auth
        [HttpGet("auth")]
        //[Authorize]
        public IActionResult CheckAuthorized()
        {
            return Json(new { IsAuthenticated = User.Identity.IsAuthenticated });
        }
    }
}
