using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tenants.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameMediaToImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tenants_Medias_MediaId",
                schema: "eshop.tenants",
                table: "Tenants");

            migrationBuilder.RenameColumn(
                name: "MediaId",
                schema: "eshop.tenants",
                table: "Tenants",
                newName: "ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Tenants_MediaId",
                schema: "eshop.tenants",
                table: "Tenants",
                newName: "IX_Tenants_ImageId");

            migrationBuilder.AlterColumn<Guid>(
                name: "TenantId",
                schema: "eshop.medias",
                table: "Medias",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Tenants_Medias_ImageId",
                schema: "eshop.tenants",
                table: "Tenants",
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
                name: "FK_Tenants_Medias_ImageId",
                schema: "eshop.tenants",
                table: "Tenants");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                schema: "eshop.tenants",
                table: "Tenants",
                newName: "MediaId");

            migrationBuilder.RenameIndex(
                name: "IX_Tenants_ImageId",
                schema: "eshop.tenants",
                table: "Tenants",
                newName: "IX_Tenants_MediaId");

            migrationBuilder.AlterColumn<Guid>(
                name: "TenantId",
                schema: "eshop.medias",
                table: "Medias",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tenants_Medias_MediaId",
                schema: "eshop.tenants",
                table: "Tenants",
                column: "MediaId",
                principalSchema: "eshop.medias",
                principalTable: "Medias",
                principalColumn: "Id");
        }
    }
}
