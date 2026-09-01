#ifndef STATE_H
#define STATE_H

typedef enum
{
    IDLE,
    START,
    RUNNING,
    BLOCKED,
    END
} state_t;

extern state_t current_state;
#endif