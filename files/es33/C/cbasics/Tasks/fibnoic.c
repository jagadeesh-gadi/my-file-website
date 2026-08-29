#include <stdio.h>

int main()
{
    int i, n, a = 0, b = 1, c;
    printf("enter n value :: ");
    scanf("%d", &n);

    for (i = 1; i <= n; i++)
    {
        printf("fibinoic of %d : %d\n", i, a);
        c = a + b;
        a = b;
        b = c;
    }
    return 0;
}