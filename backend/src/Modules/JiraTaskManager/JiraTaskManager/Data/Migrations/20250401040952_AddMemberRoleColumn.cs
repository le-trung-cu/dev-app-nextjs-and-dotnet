using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JiraTaskManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberRoleColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                schema: "jira_task_manager_workspaces",
                table: "Members",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                schema: "jira_task_manager_workspaces",
                table: "Members");
        }
    }
}
