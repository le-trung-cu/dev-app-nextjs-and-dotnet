using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlackChat.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberSlackMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Member");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Member",
                schema: "slack_chat",
                table: "Member");

            migrationBuilder.RenameTable(
                name: "Member",
                schema: "slack_chat",
                newName: "Members",
                newSchema: "slack_chat");

            migrationBuilder.RenameIndex(
                name: "IX_Member_WorkspaceId",
                schema: "slack_chat",
                table: "Members",
                newName: "IX_Members_WorkspaceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Members",
                schema: "slack_chat",
                table: "Members",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Members",
                column: "WorkspaceId",
                principalSchema: "slack_chat",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Members");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Members",
                schema: "slack_chat",
                table: "Members");

            migrationBuilder.RenameTable(
                name: "Members",
                schema: "slack_chat",
                newName: "Member",
                newSchema: "slack_chat");

            migrationBuilder.RenameIndex(
                name: "IX_Members_WorkspaceId",
                schema: "slack_chat",
                table: "Member",
                newName: "IX_Member_WorkspaceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Member",
                schema: "slack_chat",
                table: "Member",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Member",
                column: "WorkspaceId",
                principalSchema: "slack_chat",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
