import { createLogger, format, transports } from "winston";

// Set up Winston for logging
const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.colorize(),
        format.json(),
        format.prettyPrint()
    ),
    defaultMeta: { service: "vortex24-server" },
    transports: [
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" }),
        new transports.File({ filename: "logs/warning.log", level: "warning" }),
    ],
});

if (process.env.ENV === "DEV") {
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}

export default logger;
