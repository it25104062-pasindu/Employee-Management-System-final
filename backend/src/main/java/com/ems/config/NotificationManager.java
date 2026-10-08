package com.ems.config;

/**
 * Singleton class for managing shared EMS notification settings
 * and notification message formatting.
 *
 * Only one NotificationManager instance is created during
 * the application runtime.
 */
public final class NotificationManager {

    // Single instance of NotificationManager
    private static final NotificationManager INSTANCE =
            new NotificationManager();

    // Use SystemConfig Singleton
    private final SystemConfig systemConfig =
            SystemConfig.getInstance();

    // Shared notification settings
    private final String defaultSubjectPrefix;
    private final String systemFooter;

    /**
     * Private constructor prevents external object creation.
     */
    private NotificationManager() {

        this.defaultSubjectPrefix = "[EMS Notification]";

        this.systemFooter =
                "This is an automated notification from "
                        + systemConfig.getApplicationName()
                        + " v"
                        + systemConfig.getVersion()
                        + ".";
    }

    /**
     * Returns the single NotificationManager instance.
     */
    public static NotificationManager getInstance() {
        return INSTANCE;
    }

    /**
     * Adds the standard EMS prefix to an email subject.
     */
    public String buildSubject(String subject) {

        return defaultSubjectPrefix + " " + subject;
    }

    /**
     * Adds the standard EMS footer to a notification message.
     */
    public String buildMessage(String message) {

        return message + "\n\n" + systemFooter;
    }

    public String getDefaultSubjectPrefix() {

        return defaultSubjectPrefix;
    }

    public String getSystemFooter() {

        return systemFooter;
    }
}