using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlackChat.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixMessageDDDSlackMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Channels_ChannelId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ChannelId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.AlterColumn<Guid>(
                name: "ChannelId",
                schema: "slack_chat",
                table: "Messages",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "ConversationId",
                schema: "slack_chat",
                table: "Messages",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Conversation",
                schema: "slack_chat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    WorkspaceId = table.Column<Guid>(type: "uuid", nullable: false),
                    MemberOneId = table.Column<Guid>(type: "uuid", nullable: false),
                    MemeberTwoId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LasetModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conversation_Workspaces_WorkspaceId",
                        column: x => x.WorkspaceId,
                        principalSchema: "slack_chat",
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reactions",
                schema: "slack_chat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    WorkspaceId = table.Column<Guid>(type: "uuid", nullable: false),
                    MessageId = table.Column<Guid>(type: "uuid", nullable: false),
                    MemberId = table.Column<Guid>(type: "uuid", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LasetModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reactions_Messages_MessageId",
                        column: x => x.MessageId,
                        principalSchema: "slack_chat",
                        principalTable: "Messages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_WorkspaceId",
                schema: "slack_chat",
                table: "Messages",
                column: "WorkspaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_WorkspaceId",
                schema: "slack_chat",
                table: "Conversation",
                column: "WorkspaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Reactions_MessageId",
                schema: "slack_chat",
                table: "Reactions",
                column: "MessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Messages",
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
                name: "FK_Messages_Workspaces_WorkspaceId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "Conversation",
                schema: "slack_chat");

            migrationBuilder.DropTable(
                name: "Reactions",
                schema: "slack_chat");

            migrationBuilder.DropIndex(
                name: "IX_Messages_WorkspaceId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ConversationId",
                schema: "slack_chat",
                table: "Messages");

            migrationBuilder.AlterColumn<Guid>(
                name: "ChannelId",
                schema: "slack_chat",
                table: "Messages",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChannelId",
                schema: "slack_chat",
                table: "Messages",
                column: "ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Channels_ChannelId",
                schema: "slack_chat",
                table: "Messages",
                column: "ChannelId",
                principalSchema: "slack_chat",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
