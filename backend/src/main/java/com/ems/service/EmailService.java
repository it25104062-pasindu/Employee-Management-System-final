package com.ems.service;

import com.ems.config.SystemConfig;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final SystemConfig systemConfig = SystemConfig.getInstance();

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // =====================================================
    // Send normal email
    // =====================================================

    public void sendEmail(
            String to,
            String subject,
            String message) {

        try {
            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            false);

            helper.setTo(to);
            helper.setSubject(subject);

            String finalMessage =
                    message
                            + "\n\n"
                            + systemConfig.getApplicationName()
                            + " v" + systemConfig.getVersion();

            helper.setText(finalMessage);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(
                    "Failed to send email",
                    e);
        }
    }

    // =====================================================
    // Send email with PDF attachment
    // =====================================================

    public void sendEmailWithAttachment(
            String to,
            String subject,
            String message,
            byte[] attachment,
            String attachmentFileName) {

        try {
            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            true);

            helper.setTo(to);
            helper.setSubject(subject);

            String finalMessage =
                    message
                            + "\n\n"
                            + systemConfig.getApplicationName()
                            + " v" + systemConfig.getVersion();

            helper.setText(finalMessage);

            helper.addAttachment(
                    attachmentFileName,
                    new ByteArrayResource(attachment));

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(
                    "Failed to send email with attachment",
                    e);
        }
    }
}