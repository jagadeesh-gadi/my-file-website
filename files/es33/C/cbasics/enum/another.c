// using the gloabal and local variable decleration
#include <stdio.h>
typedef enum
{
    IDLE,
    START,
    RUNNING = 100000,
    ERROR,
    END
} power_t;

int main()
{
    power_t s = RUNNING;
    printf("%d\n", IDLE);
    printf("%d\n", s);

    {
        enum mode
        {
            IDLE = 10,
            RUNNING = 300
        };
        // IDLE = 900;  //we cannot inilize of declare the variable or value outside the enum it though error
        printf("%d\n", IDLE);
    }
    // RUNNING =200;  //it will through an error it wa an global value also after we declare
    printf("%d\n", RUNNING);
    return 0;
}