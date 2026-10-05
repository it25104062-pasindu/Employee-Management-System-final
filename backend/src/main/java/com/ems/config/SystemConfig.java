package com.ems.config;

/**
 * Singleton class for storing shared EMS application configuration.
 *
 * Only one SystemConfig instance is created during the application runtime.
 */
public final class SystemConfig {

    // Single instance of the class
    private static final SystemConfig INSTANCE = new SystemConfig();

    // Application-level configuration values
    private final String applicationName;
    private final String version;
    private final String supportEmail;

    /**
     * Private constructor prevents other classes from
     * creating objects using new SystemConfig().
     */
    private SystemConfig() {
        this.applicationName = "Employee Management System";
        this.version = "1.0";
        this.supportEmail = "support@ems.com";
    }

    /**
     * Returns the single instance of SystemConfig.
     */
    public static SystemConfig getInstance() {
        return INSTANCE;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public String getVersion() {
        return version;
    }

    public String getSupportEmail() {
        return supportEmail;
    }

    /**
     * Returns all main configuration details as a string.
     */
    @Override
    public String toString() {
        return "SystemConfig{" +
                "applicationName='" + applicationName + '\'' +
                ", version='" + version + '\'' +
                ", supportEmail='" + supportEmail + '\'' +
                '}';
    }
}