using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JiraTaskManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class JiraAddPositionColumnInTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Position",
                schema: "jira_task_manager_workspaces",
                table: "TaskItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                schema: "jira_task_manager_workspaces",
                table: "TaskItems");
        }
    }
}
