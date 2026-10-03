package com.ems.util;

import com.ems.entity.Payroll;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;

public class PayslipGenerator {

    private PayslipGenerator() {
    }

    public static byte[] generatePayslip(Payroll payroll) {

        try {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(
                    document,
                    outputStream);

            document.open();

            // =========================
            // FONTS
            // =========================

            Font titleFont = new Font(
                    Font.HELVETICA,
                    20,
                    Font.BOLD);

            Font headingFont = new Font(
                    Font.HELVETICA,
                    12,
                    Font.BOLD);

            Font normalFont = new Font(
                    Font.HELVETICA,
                    10,
                    Font.NORMAL);

            // =========================
            // TITLE
            // =========================

            Paragraph title = new Paragraph(
                    "EMPLOYEE PAYSLIP",
                    titleFont);

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(
                    new Paragraph(" "));

            // =========================
            // EMPLOYEE DETAILS
            // =========================

            PdfPTable employeeTable = new PdfPTable(2);

            employeeTable.setWidthPercentage(100);

            employeeTable.setSpacingAfter(15);

            addCell(
                    employeeTable,
                    "Employee Name",
                    headingFont);

            addCell(
                    employeeTable,
                    payroll.getEmployee() != null
                            ? payroll.getEmployee().getName()
                            : "N/A",
                    normalFont);

            addCell(
                    employeeTable,
                    "Employee ID",
                    headingFont);

            addCell(
                    employeeTable,
                    payroll.getEmployee() != null
                            ? payroll.getEmployee().getEmployeeCode()
                            : "N/A",
                    normalFont);

            addCell(
                    employeeTable,
                    "Department",
                    headingFont);

            addCell(
                    employeeTable,
                    payroll.getEmployee() != null
                            ? payroll.getEmployee().getDepartment()
                            : "N/A",
                    normalFont);

            addCell(
                    employeeTable,
                    "Payroll Month",
                    headingFont);

            addCell(
                    employeeTable,
                    payroll.getPayrollMonth(),
                    normalFont);

            document.add(employeeTable);

            // =========================
            // SALARY DETAILS
            // =========================

            Paragraph salaryHeading = new Paragraph(
                    "Salary Details",
                    headingFont);

            document.add(salaryHeading);

            document.add(
                    new Paragraph(" "));

            PdfPTable salaryTable = new PdfPTable(2);

            salaryTable.setWidthPercentage(100);

            addCell(
                    salaryTable,
                    "Basic Salary",
                    normalFont);

            addCell(
                    salaryTable,
                    "LKR " +
                            payroll.getBasicSalary()
                                    .toPlainString(),
                    normalFont);

            addCell(
                    salaryTable,
                    "Allowances",
                    normalFont);

            addCell(
                    salaryTable,
                    "LKR " +
                            payroll.getAllowances()
                                    .toPlainString(),
                    normalFont);

            addCell(
                    salaryTable,
                    "Deductions",
                    normalFont);

            addCell(
                    salaryTable,
                    "LKR " +
                            payroll.getDeductions()
                                    .toPlainString(),
                    normalFont);

            addCell(
                    salaryTable,
                    "NET SALARY",
                    headingFont);

            addCell(
                    salaryTable,
                    "LKR " +
                            payroll.getNetSalary()
                                    .toPlainString(),
                    headingFont);

            document.add(salaryTable);

            document.add(
                    new Paragraph(" "));

            // =========================
            // STATUS
            // =========================

            Paragraph status = new Paragraph(
                    "Status: " + payroll.getStatus(),
                    normalFont);

            status.setAlignment(
                    Element.ALIGN_RIGHT);

            document.add(status);

            document.add(
                    new Paragraph(" "));

            // =========================
            // FOOTER
            // =========================

            Paragraph footer = new Paragraph(
                    "Employee Management System",
                    normalFont);

            footer.setAlignment(
                    Element.ALIGN_CENTER);

            document.add(footer);

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate payslip PDF",
                    e);
        }
    }

    private static void addCell(
            PdfPTable table,
            String text,
            Font font) {

        PdfPCell cell = new PdfPCell(
                new Phrase(text, font));

        cell.setPadding(8);

        table.addCell(cell);
    }
}