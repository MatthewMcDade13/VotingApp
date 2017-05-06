using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using VotingApp.Models;
using VotingApp.ViewModels;

namespace VotingApp.Controllers.Web
{
    public class AuthController : Controller
    {
        private SignInManager<User> signInManager;
        private UserManager<User> userManager;
        private IVotingRepository repo;

        public AuthController(SignInManager<User> signInManager,
            UserManager<User> userManager, IVotingRepository repo)
        {
            this.repo = repo;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var signInResult = await signInManager.PasswordSignInAsync(vm.UserName,
                                                                              vm.Password,
                                                                              true, false);
                if (signInResult.Succeeded)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Username or password incorrect");
                }
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel vm)
        {
            //If ModelState is valid
            if (ModelState.IsValid)
            {
                //and there is no current email with the given user email
                if (await userManager.FindByEmailAsync(vm.Email) == null)
                {
                    //create user
                    User user = new User()
                    {
                        UserName = vm.UserName,
                        Email = vm.Email,
                        DateCreated = DateTime.UtcNow
                    };

                    //Attempt to create the user
                    var createResult = await userManager.CreateAsync(user, vm.Password);

                    //Check if we can create user with provided information
                    if (!createResult.Succeeded)
                    {
                        //If it did not succeed in creating the user model, notify the end user 
                        ModelState.AddModelError("", createResult.Errors.ToList()[0].Description);
                        return View();
                    }

                    //Save changes to DB and sign the user in
                    await repo.SaveChangesAsync();
                    await signInManager.PasswordSignInAsync(vm.UserName, vm.Password, true, false);

                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Email is already in use, please use a differnet one");
                }
            }

            return View();
        }

        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await signInManager.SignOutAsync();
            }

            return RedirectToAction("Index", "Home");
        }
    }
}
