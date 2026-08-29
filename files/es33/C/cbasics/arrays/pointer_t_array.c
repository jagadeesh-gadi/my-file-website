#include <stdio.h>

int main()
{
    int a[4] = {10, 20, 30, 40, 50};
    int (*ptr)[5] = &a;
    for (int i = 0; i < 5; i++)
    {
        printf("value = %d address =%p\n", (*ptr)[i], (void *)(*ptr)[i]);
    }
    return 0;
}