using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docs.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserIdInOrganizations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "docs",
                table: "Organizations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                schema: "docs",
                table: "Organizations",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
