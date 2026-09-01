#include <stdio.h>
enum state
{
    IDLE,
    START,
    RUNNING,
    ERROR,
    BLOCKED,
    END
};

int main()
{

    enum state s;
    int v;

    printf("Enter state number: ");
    scanf("%d", &v);
    s = v; // directly the taking of scnaf statment wont wrok when we declare as enum
    int i;
    enum state *ptr = &s;       // assaign values through the pointer values
    for (i = 0; i <= *ptr; i++) // printing the vlues of the all enum values
    {
        printf("i = %d\n", i);

        printf("Address = %p\n", (void *)ptr + i); // address of the all values in the enum

        printf("Enum size = %zu\n", sizeof(s)); // every enum size was 4 bytes
    }
    // switch statement
    printf("\nswitch statment \n");
    *ptr = IDLE;
    switch (*ptr)
    {
    case IDLE:
        printf("Idle :: %d\n", IDLE);
        break;
    case START:
        printf("START:: %d\n", START);
        break;
    case RUNNING:
        printf("RUNNING :: %d\n", RUNNING);
        break;
    case ERROR:
        printf("ERRROR :: %d\n", ERROR);
        break;
    case BLOCKED:
        printf("BLOCKED:: %d\n", BLOCKED);
        break;
    case END:
        printf("END :: %d\n", END);
        break;

    default:
        printf("enter correct value \n");
        break;
    }
    return 0;
}