#include <stdio.h>
#define DEBUGER 5
int main()
{
#if (DEBUGER <= 0)
    printf("DEBUGER WAS PRINTING \n");
#else
    printf("DEBUGER WAS NOT PRINTING \n");

#endif
    return 0;
}