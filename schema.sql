DROP TABLE IF EXISTS track_events;
CREATE TABLE track_events (
    eventid INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name text,
    event_time text
);
INSERT INTO
    track_events (
        event_name,
        event_time
    )
VALUES
    (
        'Open app',
        CURRENT_TIMESTAMP
    ),
    (
        'Open app',
        CURRENT_TIMESTAMP
    ),
    (
        'Open app',
        CURRENT_TIMESTAMP
    ),
    (
        'Open app',
        CURRENT_TIMESTAMP
    );
