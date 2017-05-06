using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.Configuration;
using VotingApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace VotingApp
{
    public class Startup
    {
        private IHostingEnvironment env;

        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            this.env = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            .AddJsonOptions(options =>
            {
                options
                .SerializerSettings
                .ContractResolver =
                new CamelCasePropertyNamesContractResolver();
            });

            services.AddSingleton(Configuration);

            services.AddIdentity<User, IdentityRole>( config =>
            {
                config.User.RequireUniqueEmail = true;      //Require user to provide unique email
                config.Password.RequiredLength = 8;         //Require user to provide password of at least 8 characters
                config.Cookies.ApplicationCookie.LoginPath = "/Auth/Login";     //Redirects unathorized user to login page when attempting to access restricted pages
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    //Here we tell Identity to send a status code of 401 if an unauthorized  
                    //user attempts to make an api call
                    OnRedirectToLogin = async context => 
                    {
                        if (context.Request.Path.StartsWithSegments("/api") &&
                            context.Response.StatusCode == 200)
                        {
                            context.Response.StatusCode = 401;
                        }
                        else
                        {
                            context.Response.Redirect(context.RedirectUri);
                        }

                        await Task.Yield();
                    }
                };
            })
            .AddEntityFrameworkStores<VotingContext>(); //Att Context class to ASP.NET Identity

            //Add a context class to be read by the database
            services.AddDbContext<VotingContext>();

            //Adding a repository service
            services.AddScoped<IVotingRepository, VotingRepository>();

            //Adding the seeder service to ensure data is in database
            services.AddTransient<VotingAppSeedData>();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, VotingAppSeedData seeder)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(config =>
            {
                config.MapRoute(
                    "Default",
                    "{controller}/{action}/{id?}",
                    new { controller = "Home", action = "Index" });

                config.MapRoute(
                    "Error",
                    "{*url}",
                    new { controller = "Home", action = "Error" });
            });

            //Ensures Data is in the database
            seeder.EnsureSeedData().Wait();
        }
    }
}
