#include <stdio.h>

int main()
{
    int i, n,num = 1;
    scanf("%d", &n);

    for (i = 1; i <= n; i++)
    {
        printf("7 * %d = %d\t", num, (num << 3) - num);
        printf("9 * %d = %d\n", num, (num << 3) + num);
        num++;
    }

    return 0;
}