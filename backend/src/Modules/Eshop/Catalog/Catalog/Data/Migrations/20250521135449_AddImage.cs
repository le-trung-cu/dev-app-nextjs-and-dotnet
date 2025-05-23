using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Catalog.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFile",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.EnsureSchema(
                name: "eshop.medias");

            migrationBuilder.AddColumn<Guid>(
                name: "CoverId",
                schema: "eshop.catalog",
                table: "Products",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                schema: "eshop.catalog",
                table: "Products",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                schema: "eshop.catalog",
                table: "Products",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPrivate",
                schema: "eshop.catalog",
                table: "Products",
                type: "boolean",
                nullable: false,
                defaultValue: false);
      
            // migrationBuilder.CreateTable(
            //     name: "Medias",
            //     schema: "eshop.medias",
            //     columns: table => new
            //     {
            //         Id = table.Column<Guid>(type: "uuid", nullable: false),
            //         TenantId = table.Column<Guid>(type: "uuid", nullable: true),
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
                name: "IX_Products_CoverId",
                schema: "eshop.catalog",
                table: "Products",
                column: "CoverId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ImageId",
                schema: "eshop.catalog",
                table: "Products",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Medias_CoverId",
                schema: "eshop.catalog",
                table: "Products",
                column: "CoverId",
                principalSchema: "eshop.medias",
                principalTable: "Medias",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Medias_ImageId",
                schema: "eshop.catalog",
                table: "Products",
                column: "ImageId",
                principalSchema: "eshop.medias",
                principalTable: "Medias",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Medias_CoverId",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Medias_ImageId",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Medias",
                schema: "eshop.medias");

            migrationBuilder.DropIndex(
                name: "IX_Products_CoverId",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ImageId",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CoverId",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageId",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsArchived",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsPrivate",
                schema: "eshop.catalog",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ImageFile",
                schema: "eshop.catalog",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
