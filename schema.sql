DROP TABLE IF EXISTS track_events;
CREATE TABLE track_events (
    eventid INTEGER primary key autoincrement,
    userid text,
    event_name text,
    event_time text
);
INSERT INTO
    track_events (
        userid,
        event_name,
        event_time
    )
VALUES
    (
        'testing_user_id',
        'Open app',
        CURRENT_TIMESTAMP
    );
