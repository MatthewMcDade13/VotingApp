using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VotingApp.Migrations
{
    public partial class AddedDateCreatedToUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Polls_AspNetUsers_UserId",
                table: "Polls");

            migrationBuilder.DropIndex(
                name: "IX_Polls_UserId",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Polls");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Polls",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Polls_UserId",
                table: "Polls",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_AspNetUsers_UserId",
                table: "Polls",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
