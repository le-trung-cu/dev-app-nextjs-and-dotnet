using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Auth.Data.Migrations
{
    /// <inheritdoc />
    public partial class RefreshToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeviceName",
                schema: "auth",
                table: "AspNetUserTokens",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiredAt",
                schema: "auth",
                table: "AspNetUserTokens",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                schema: "auth",
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1a2b3c4d-1234-5678-9101-abcdefabcdef",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "908461f6-c0cd-42a5-961e-b9110a8e1e05", "AQAAAAIAAYagAAAAEMndCTYRrSZG/HKT0Jrx/2ZdC34rLPVWirPVM9GMJ0cXFNZJA5p2aS86nAEMVdagzA==", "61fbdd72-e7e9-4f03-bb88-67a38ce1aa32" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeviceName",
                schema: "auth",
                table: "AspNetUserTokens");

            migrationBuilder.DropColumn(
                name: "ExpiredAt",
                schema: "auth",
                table: "AspNetUserTokens");

            migrationBuilder.UpdateData(
                schema: "auth",
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1a2b3c4d-1234-5678-9101-abcdefabcdef",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b056dfa5-3dcb-4d84-95f8-88f1c3086ffd", "AQAAAAIAAYagAAAAEN64m+I8tagjsjgO6N1ENzK2tBDPVWNcTKDxDPjadPSqlUHnMtQhMJhaGgF3N6zgTA==", "7871a1ad-6389-4d83-a3d2-7a3f740ff265" });
        }
    }
}
