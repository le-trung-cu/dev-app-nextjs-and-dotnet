using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JiraTaskManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddForeignKeyTaskItemToProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_ProjectId",
                schema: "jira_task_manager_workspaces",
                table: "TaskItems",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Projects_ProjectId",
                schema: "jira_task_manager_workspaces",
                table: "TaskItems",
                column: "ProjectId",
                principalSchema: "jira_task_manager_workspaces",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Projects_ProjectId",
                schema: "jira_task_manager_workspaces",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_ProjectId",
                schema: "jira_task_manager_workspaces",
                table: "TaskItems");
        }
    }
}
