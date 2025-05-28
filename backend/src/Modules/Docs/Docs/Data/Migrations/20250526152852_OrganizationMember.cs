using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docs.Data.Migrations
{
    /// <inheritdoc />
    public partial class OrganizationMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_Organizations_OrganizationId",
                schema: "docs",
                table: "Member");

            migrationBuilder.DropTable(
                name: "Invite",
                schema: "docs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Member",
                schema: "docs",
                table: "Member");

            migrationBuilder.RenameTable(
                name: "Member",
                schema: "docs",
                newName: "Members",
                newSchema: "docs");

            migrationBuilder.RenameIndex(
                name: "IX_Member_OrganizationId",
                schema: "docs",
                table: "Members",
                newName: "IX_Members_OrganizationId");

            migrationBuilder.AddColumn<bool>(
                name: "IsJoined",
                schema: "docs",
                table: "Members",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Members",
                schema: "docs",
                table: "Members",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Organizations_OrganizationId",
                schema: "docs",
                table: "Members",
                column: "OrganizationId",
                principalSchema: "docs",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Organizations_OrganizationId",
                schema: "docs",
                table: "Members");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Members",
                schema: "docs",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "IsJoined",
                schema: "docs",
                table: "Members");

            migrationBuilder.RenameTable(
                name: "Members",
                schema: "docs",
                newName: "Member",
                newSchema: "docs");

            migrationBuilder.RenameIndex(
                name: "IX_Members_OrganizationId",
                schema: "docs",
                table: "Member",
                newName: "IX_Member_OrganizationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Member",
                schema: "docs",
                table: "Member",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Invite",
                schema: "docs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LasetModifiedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OrganizationId = table.Column<Guid>(type: "uuid", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invite_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalSchema: "docs",
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invite_OrganizationId",
                schema: "docs",
                table: "Invite",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_Organizations_OrganizationId",
                schema: "docs",
                table: "Member",
                column: "OrganizationId",
                principalSchema: "docs",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
