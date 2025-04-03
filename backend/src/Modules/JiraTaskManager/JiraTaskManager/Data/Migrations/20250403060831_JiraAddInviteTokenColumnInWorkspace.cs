using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JiraTaskManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class JiraAddInviteTokenColumnInWorkspace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InviteToken",
                schema: "jira_task_manager_workspaces",
                table: "Workspaces",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InviteToken",
                schema: "jira_task_manager_workspaces",
                table: "Workspaces");
        }
    }
}
