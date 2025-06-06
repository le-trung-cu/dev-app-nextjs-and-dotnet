using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlackChat.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenameMemberRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Messages_ParentMessageId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                schema: "slack_chat",
                table: "Members",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Messages_ParentMessageId",
                schema: "slack_chat",
                table: "Messages",
                column: "ParentMessageId",
                principalSchema: "slack_chat",
                principalTable: "Messages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Messages_ParentMessageId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                schema: "slack_chat",
                table: "Members",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Messages_ParentMessageId",
                schema: "slack_chat",
                table: "Messages",
                column: "ParentMessageId",
                principalSchema: "slack_chat",
                principalTable: "Messages",
                principalColumn: "Id");
        }
    }
}
