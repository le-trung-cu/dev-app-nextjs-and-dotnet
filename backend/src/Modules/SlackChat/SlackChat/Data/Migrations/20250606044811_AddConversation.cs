using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlackChat.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversation_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Conversation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Conversation",
                schema: "slack_chat",
                table: "Conversation");

            migrationBuilder.RenameTable(
                name: "Conversation",
                schema: "slack_chat",
                newName: "Conversations",
                newSchema: "slack_chat");

            migrationBuilder.RenameColumn(
                name: "MemeberTwoId",
                schema: "slack_chat",
                table: "Conversations",
                newName: "MemberTwoId");

            migrationBuilder.RenameIndex(
                name: "IX_Conversation_WorkspaceId",
                schema: "slack_chat",
                table: "Conversations",
                newName: "IX_Conversations_WorkspaceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Conversations",
                schema: "slack_chat",
                table: "Conversations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_MemberOneId",
                schema: "slack_chat",
                table: "Conversations",
                column: "MemberOneId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_MemberTwoId",
                schema: "slack_chat",
                table: "Conversations",
                column: "MemberTwoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Members_MemberOneId",
                schema: "slack_chat",
                table: "Conversations",
                column: "MemberOneId",
                principalSchema: "slack_chat",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Members_MemberTwoId",
                schema: "slack_chat",
                table: "Conversations",
                column: "MemberTwoId",
                principalSchema: "slack_chat",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Conversations",
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
                name: "FK_Conversations_Members_MemberOneId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Members_MemberTwoId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Conversations",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_MemberOneId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_MemberTwoId",
                schema: "slack_chat",
                table: "Conversations");

            migrationBuilder.RenameTable(
                name: "Conversations",
                schema: "slack_chat",
                newName: "Conversation",
                newSchema: "slack_chat");

            migrationBuilder.RenameColumn(
                name: "MemberTwoId",
                schema: "slack_chat",
                table: "Conversation",
                newName: "MemeberTwoId");

            migrationBuilder.RenameIndex(
                name: "IX_Conversations_WorkspaceId",
                schema: "slack_chat",
                table: "Conversation",
                newName: "IX_Conversation_WorkspaceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Conversation",
                schema: "slack_chat",
                table: "Conversation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Conversation",
                column: "WorkspaceId",
                principalSchema: "slack_chat",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
