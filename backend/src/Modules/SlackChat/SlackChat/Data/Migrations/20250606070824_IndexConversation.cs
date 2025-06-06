using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlackChat.Data.Migrations
{
    /// <inheritdoc />
    public partial class IndexConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Conversations_MemberOneId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_MemberOneId_MemberTwoId",
                schema: "slack_chat",
                table: "Conversations",
                columns: new[] { "MemberOneId", "MemberTwoId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Conversations_MemberOneId_MemberTwoId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_MemberOneId",
                schema: "slack_chat",
                table: "Conversations",
                column: "MemberOneId");
        }
    }
}
