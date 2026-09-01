// Problem 3 — Find Most Frequent Enum State
#include <stdio.h>
typedef enum
{
    IDLE,
    RUNNING,
    ERROR,
    BLOCKED,
    END
} state_t;

int main()
{

    int v, i, n, count[5] = {0};
    printf("Enter number of states: ");
    scanf("%d", &n);
    printf("Enter states (0-IDLE, 1-RUNNING, 2-ERROR, 3-BLOCKED, 4-END):\n");
    for (i = 0; i < n; i++)
    {
        scanf("%d", &v);
        if (v >= IDLE && v <= END)
        {
            count[v]++;
        }
        else
        {
            printf("invalid input ::%d\n", v);
        }
    }
    printf("values after that count \n");
    for (i = 0; i <= END; i++)
    {
        printf("count[%d] :: %d\n", i, count[i]);
    }
}