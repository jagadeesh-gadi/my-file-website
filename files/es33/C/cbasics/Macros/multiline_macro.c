#include <stdio.h>
#define print_DETAILS()                \
    do                                 \
    {                                  \
        printf("embedded systems \n"); \
        printf("mutliline macro \n");  \
    } while (0)

int main()
{
    print_DETAILS();
    return 0;
}