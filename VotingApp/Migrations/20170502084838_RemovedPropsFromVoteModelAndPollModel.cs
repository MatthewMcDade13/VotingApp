using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VotingApp.Migrations
{
    public partial class RemovedPropsFromVoteModelAndPollModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PollName",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Polls");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PollName",
                table: "Votes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Polls",
                nullable: true);
        }
    }
}
