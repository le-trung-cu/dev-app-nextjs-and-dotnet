using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tenants.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "eshop.medias");

            migrationBuilder.AddColumn<Guid>(
                name: "MediaId",
                schema: "eshop.tenants",
                table: "Tenants",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StripeAccountId",
                schema: "eshop.tenants",
                table: "Tenants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "StripeDetailsSubmitted",
                schema: "eshop.tenants",
                table: "Tenants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // migrationBuilder.CreateTable(
            //     name: "Medias",
            //     schema: "eshop.medias",
            //     columns: table => new
            //     {
            //         Id = table.Column<Guid>(type: "uuid", nullable: false),
            //         TenantId = table.Column<Guid>(type: "uuid", nullable: false),
            //         Name = table.Column<string>(type: "text", nullable: false),
            //         Path = table.Column<string>(type: "text", nullable: false),
            //         Alt = table.Column<string>(type: "text", nullable: false),
            //         CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
            //         CreatedBy = table.Column<string>(type: "text", nullable: true),
            //         LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
            //         LasetModifiedBy = table.Column<string>(type: "text", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Medias", x => x.Id);
            //     });

            migrationBuilder.CreateIndex(
                name: "IX_Tenants_MediaId",
                schema: "eshop.tenants",
                table: "Tenants",
                column: "MediaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tenants_Medias_MediaId",
                schema: "eshop.tenants",
                table: "Tenants",
                column: "MediaId",
                principalSchema: "eshop.medias",
                principalTable: "Medias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tenants_Medias_MediaId",
                schema: "eshop.tenants",
                table: "Tenants");

            migrationBuilder.DropTable(
                name: "Medias",
                schema: "eshop.medias");

            migrationBuilder.DropIndex(
                name: "IX_Tenants_MediaId",
                schema: "eshop.tenants",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "MediaId",
                schema: "eshop.tenants",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "StripeAccountId",
                schema: "eshop.tenants",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "StripeDetailsSubmitted",
                schema: "eshop.tenants",
                table: "Tenants");
        }
    }
}
