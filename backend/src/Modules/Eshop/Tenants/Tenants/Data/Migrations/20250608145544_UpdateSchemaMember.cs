using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tenants.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchemaMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StripeAccountId",
                schema: "eshop.tenants",
                table: "Tenants",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                schema: "eshop.tenants",
                table: "Members",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Members_UserId",
                schema: "eshop.tenants",
                table: "Members",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Members_UserId",
                schema: "eshop.tenants",
                table: "Members");

            migrationBuilder.AlterColumn<string>(
                name: "StripeAccountId",
                schema: "eshop.tenants",
                table: "Tenants",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                schema: "eshop.tenants",
                table: "Members",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
