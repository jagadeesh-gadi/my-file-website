#include <stdio.h>
// register int i = 10;
int main()
{
    register int i;
    register int a;

    for (i = 0; i <= 100; i++)
    {
        printf("%d\n", i);
    }
    printf("%d\n",a);
    return 0;
}